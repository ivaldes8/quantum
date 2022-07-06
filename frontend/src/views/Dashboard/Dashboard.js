import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";

import { getDashboard, reset } from "../../core/redux/features/user/userSlice";


import AddLine from "../../core/custom-components/AddLine";
import Format from "../../core/formats/Format";
import Loading from "../../core/custom-components/Loading";
import { Container, Divider, Typography, IconButton, Card, Grid } from "@mui/material";
import { TrendingDown, TrendingUp, AttachMoney } from '@mui/icons-material';

import ReactEcharts from "echarts-for-react";

import './dashboard.css'

const Dashboard = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { dashBoard, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  const [depositPerGroup, setDepositPerGroup] = useState({});
  const [feedbackPerGroup, setFeedbackPerGroup] = useState({});
  const [balancePerGroup, setBalancePerGroup] = useState({});
  const [depositPerInvestment, setDepositPerInvestment] = useState(null);
  const [feedbackPerInvestment, setFeedbackPerInvestment] = useState(null);
  const [balancePerInvestment, setBalancePerInvestment] = useState(null);
  const [investmentBehavior, setInvestmentBehavior] = useState(null);

  const refineInvestment = (investment, behave) => {
    const exchange = _.find(dashBoard.exchanges, { currency: investment.currency._id })
    if (!behave) {
      let deposit = 0
      let feedback = 0
      if (investment.currency._id === dashBoard.userCurrency) {
        deposit += investment.actions.map((a) => { return a.amount }).reduce((a, b) => a + b, 0)
        feedback += investment.actions.map((a) => { return a.feedback }).reduce((a, b) => a + b, 0)
      } else {
        deposit += investment.actions.map((a) => { return a.amount / exchange.change }).reduce((a, b) => a + b, 0)
        feedback += investment.actions.map((a) => { return a.feedback / exchange.change }).reduce((a, b) => a + b, 0)
      }

      return [deposit, feedback]
    } else {
      let actions = []
      let amount = 0
      if (investment.currency._id === dashBoard.userCurrency) {
        actions = _.map(investment.actions, (a) => {
          amount += -a.amount + a.feedback
          return [a.date, amount]
        })
      } else {
        actions = _.map(investment.actions, (a) => {
          amount += -a.amount / exchange.change + a.feedback / exchange.change
          return [a.date, amount]
        })
      }
      return actions
    }

  }

  const groupData = (dashboard) => {

    let depositPerGroup = _.map(dashboard.groups, (g) => {
      let inv = _.map(g.investments, (i) => {
        let refineInv = refineInvestment(i)
        return { name: i.name, value: refineInv[0] }
      })
      return { name: g.name, children: inv }
    })

    let feedBackPerGroup = _.map(dashboard.groups, (g) => {
      let inv = _.map(g.investments, (i) => {
        let refineInv = refineInvestment(i)
        return { name: i.name, value: refineInv[1] }
      })
      return { name: g.name, children: inv }
    })

    let balancePerGroup = _.map(dashboard.groups, (g) => {
      let inv = _.map(g.investments, (i) => {
        let refineInv = refineInvestment(i)
        return { name: i.name, value: -refineInv[0] + refineInv[1] }
      })
      return { name: g.name, children: inv }
    })

    setDepositPerGroup(depositPerGroup)
    setFeedbackPerGroup(feedBackPerGroup)
    setBalancePerGroup(balancePerGroup)
  }

  const investmentData = (dashboard) => {
    let depositInvestment = _.map(dashboard.investments, (i) => {
      let refineInv = refineInvestment(i)
      return { name: i.name, value: refineInv[0] }
    })

    let feedBackInvestment = _.map(dashboard.investments, (i) => {
      let refineInv = refineInvestment(i)
      return { name: i.name, value: refineInv[1] }
    })

    let balanceInvestment = _.map(dashboard.investments, (i) => {
      let refineInv = refineInvestment(i)
      return { name: i.name, value: -refineInv[0] + refineInv[1] }
    })

    setDepositPerInvestment(depositInvestment)
    setFeedbackPerInvestment(feedBackInvestment)
    setBalancePerInvestment(balanceInvestment)
  }

  const investmentBehaviorData = (dashboard) => {
    let investmentBehave = _.map(dashboard.investments, (i) => {
      let refineInv = refineInvestment(i, true)
      return { name: i.name, type: 'line', data: refineInv }
    })
    setInvestmentBehavior(investmentBehave)
  }

  const buildByGroup = (data) => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}'
      },
      series: {
        type: 'sunburst',
        data: data,
        radius: [0, '95%'],
        emphasis: {
          focus: 'ancestor'
        },
        itemStyle: {
          borderRadius: 4,
          borderWidth: 2
        },

      }
    };
  }

  const buildByInvestment = (dato) => {
    return {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Investment',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: dato
        }
      ]
    }
  }

  const buildInvestmentBehave = (dato) => {
    return {
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      dataZoom: [
        {
          startValue: '2014-06-01'
        },
        {
          type: 'inside'
        }
      ],
      xAxis: {
        type: 'time',
        boundaryGap: false
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '30%']
      },
      series: dato
    }
  }

  useEffect(() => {
    if (dashBoard) {
      groupData(dashBoard)
      investmentData(dashBoard)
      investmentBehaviorData(dashBoard)
    }
  }, [dashBoard])

  useEffect(() => {
    dispatch(getDashboard());
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddLine />
      <br />
      {dashBoard && depositPerGroup && feedbackPerGroup && balancePerGroup && depositPerInvestment && feedbackPerInvestment && balancePerInvestment && investmentBehavior &&
        <Container>
          <Grid container >
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1 }}>
                <div className="box-top">
                  {Format.formatCurrency(dashBoard.ganancy)}
                </div>
                <div className="box">
                  <IconButton aria-label="add an alarm" size="large" color="primary" style={{ zIndex: 1000, backgroundColor: '#d9dbdd' }}>
                    <AttachMoney />
                  </IconButton>
                </div>
                <div className="box-bottom">
                  <Typography variant='h5'>{t('balance')}</Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1 }}>
                <div className="box-top">
                  {Format.formatCurrency(dashBoard.deposit)}
                </div>
                <div className="box">
                  <IconButton aria-label="add an alarm" size="large" color="primary" style={{ zIndex: 1000, backgroundColor: '#d9dbdd' }}>
                    <TrendingDown />
                  </IconButton>
                </div>
                <div className="box-bottom">
                  <Typography variant='h5'>{t('totalDeposit')}</Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1 }}>
                <div className="box-top">
                  {Format.formatCurrency(dashBoard.feedback)}
                </div>
                <div className="box">
                  <IconButton aria-label="add an alarm" size="large" color="primary" style={{ zIndex: 1000, backgroundColor: '#d9dbdd' }}>
                    <TrendingUp />
                  </IconButton>
                </div>
                <div className="box-bottom">
                  <Typography variant='h5'>{t('totalReturn')}</Typography>
                </div>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('balanceByGroup')}</Typography>
                <Divider />
                <ReactEcharts option={buildByGroup(balancePerGroup)} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('depositByGroup')}</Typography>
                <Divider />
                <ReactEcharts option={buildByGroup(depositPerGroup)} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('returnByGroup')}</Typography>
                <Divider />
                <ReactEcharts option={buildByGroup(feedbackPerGroup)} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('balanceByInvestment')}</Typography>
                <Divider />
                <ReactEcharts option={buildByInvestment(balancePerInvestment)} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('depositByInvestment')}</Typography>
                <Divider />
                <ReactEcharts option={buildByInvestment(depositPerInvestment)} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={4} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('returnByInvestment')}</Typography>
                <Divider />
                <ReactEcharts option={buildByInvestment(feedbackPerInvestment)} />
              </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', alignContent: 'center' }}>
              <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
                <Typography variant="h5" style={{ margin: 10 }}>{t('investmentBehavior')}</Typography>
                <Divider />
                <ReactEcharts style={{ height: '400px' }} option={buildInvestmentBehave(investmentBehavior)} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      }

      <AddLine />
    </>
  )
}

export default Dashboard