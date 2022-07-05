import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { getDashboard, reset } from "../../core/redux/features/user/userSlice";


import AddLine from "../../core/custom-components/AddLine";
import Format from "../../core/formats/Format";
import Loading from "../../core/custom-components/Loading";
import { Container, Divider, Paper, Typography, IconButton, Card, Grid } from "@mui/material";
import { TrendingDown, TrendingUp, AttachMoney } from '@mui/icons-material';

import ReactEcharts from "echarts-for-react";

import './dashboard.css'

const Dashboard = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dashBoard, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const depositByGroupData = [
    {
      name: 'Flora',
      children: [
        {
          name: 'Black Tea',
          value: 10,
        },
        {
          name: 'Floral',
          value: 20
        }
      ]
    },
    {
      name: 'Fruity',
      children: [
        {
          name: 'Berry',
          value: 5
        },
        {
          name: 'Dried',
          value: 15
        },
        {
          name: 'Other',
          value: 20
        },
        {
          name: 'Citrus',
          value: 25
        }
      ]
    },
    {
      name: 'Sour',
      children: [
        {
          name: 'Sour',
          value: 10
        },
        {
          name: 'Alcohol',
          value: 10
        }
      ]
    },
    {
      name: 'Vegetative',
      children: [
        {
          name: 'Olive',
          value: 7
        },
        {
          name: 'Raw',
          value: 8
        },
        {
          name: 'Green',
          value: 9
        },
        {
          name: 'Beany',
          value: 10
        }
      ]
    },
    {
      name: 'Other',
      children: [
        {
          name: 'Papery',
          value: 30
        },
        {
          name: 'Chemical',
          value: 35
        }
      ]
    }
  ]


  const depositByGroupOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}'
    },
    series: {
      type: 'sunburst',
      data: depositByGroupData,
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

  const depositByInvestmentData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' }
  ]

  const depositByInvestmentOption = {
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
        data: depositByInvestmentData
      }
    ]
  };

  const investmentBehaviorSeries = [
    {
      type: 'line',
      name: 'Investment1',
      data: [
        ['2019-10-10', 200],
        ['2019-10-11', 560],
        ['2019-10-12', 750],
        ['2019-10-13', 580],
        ['2019-10-14', 250],
        ['2019-10-15', 300],
        ['2019-10-16', 450],
        ['2019-10-17', 300],
        ['2019-10-18', 100]
      ]
    },
    {
      type: 'line',
      name: 'Investment2',
      data: [

        ['2019-10-5', 700],
        ['2019-10-12', 750],
        ['2019-10-13', 580],
        ['2019-10-18', 100],
        ['2019-10-20', 230],
        ['2019-10-22', 10],
        ['2019-10-24', 500],
        ['2019-10-28', 2000]
      ]
    },
    {
      type: 'line',
      name: 'Investment3',
      data: [
        ['2019-10-1', 122],
        ['2019-10-10', 222],
        ['2019-10-13', 346],
        ['2019-10-17', 100],
        ['2019-10-20', 20]
      ]
    }
  ]

  const investmentBehaviorOption = {
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
    series: investmentBehaviorSeries
  }

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
          <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignContent: 'center' }}>
            <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
              <Typography variant="h5" style={{ margin: 10 }}>{t('depositByGroup')}</Typography>
              <Divider />
              <ReactEcharts option={depositByGroupOption} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignContent: 'center' }}>
            <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
              <Typography variant="h5" style={{ margin: 10 }}>{t('returnByGroup')}</Typography>
              <Divider />
              <ReactEcharts option={depositByGroupOption} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignContent: 'center' }}>
            <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
              <Typography variant="h5" style={{ margin: 10 }}>{t('depositByInvestment')}</Typography>
              <Divider />
              <ReactEcharts option={depositByInvestmentOption} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} style={{ display: 'flex', alignContent: 'center' }}>
            <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
              <Typography variant="h5" style={{ margin: 10 }}>{t('returnByInvestment')}</Typography>
              <Divider />
              <ReactEcharts option={depositByInvestmentOption} />
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', alignContent: 'center' }}>
            <Card sx={{ minWidth: 200, width: '100%', margin: 1, textAlign: 'center' }}>
              <Typography variant="h5" style={{ margin: 10 }}>{t('investmentBehavior')}</Typography>
              <Divider />
              <ReactEcharts style={{ height: '400px' }} option={investmentBehaviorOption} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <AddLine />
    </>
  )
}

export default Dashboard