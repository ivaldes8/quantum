import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { getGroup, reset } from "../../core/redux/features/groups/groupSlice";
import { getCurrentUser } from "../../core/redux/features/user/userSlice";
import { getExchanges } from "../../core/redux/features/exchange/exchangeSlice";

import Format from "../../core/formats/Format";
import Header from "../../core/custom-components/Header";
import Table from "../../core/custom-components/table/Table";
import AddLine from "../../core/custom-components/AddLine";
import Loading from "../../core/custom-components/Loading";
import { Container, Divider, Paper, Typography } from "@mui/material";

const GroupInvestments = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentGroup, isLoading, isError, message } = useSelector(
    (state) => state.group
  );

  const { currentUser } = useSelector(
    (state) => state.user
  );

  const { exchanges } = useSelector(
    (state) => state.exchange
  );

  const { id, name } = useParams();

  const investmentTableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "name",
    },
    {
      id: "change",
      numeric: true,
      disablePadding: false,
      label: "exchange",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "deposit",
      numeric: true,
      disablePadding: false,
      label: "deposit",
    },
    {
      id: "feedback",
      numeric: true,
      disablePadding: false,
      label: "return",
    },
  ];

  const investmentCells = ["name", "currencyM", "description", "deposit", "feedback"];

  const calculateTotals = (list) => {
    let amount = 0;
    let feedBack = 0;
    list.map((i) => {
      i.actions.map((a) => {
        let exchange = exchanges.find((e) => {return e.currency.name === i.currency.name})
        amount += currentUser.currency.name === i.currency.name ? a.amount : exchange ?  a.amount/exchange.change : 0;
        feedBack += currentUser.currency.name === i.currency.name ? a.feedback : exchange ?  a.feedback/exchange.change : 0;
      })

    });
    return ` ${t("totals")}: ${Format.formatCurrency(
      amount
    )} / ${Format.formatCurrency(feedBack)} = ${Format.formatCurrency(-amount + feedBack)} - ${currentUser.currency.name}`;
  };

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getExchanges());
    dispatch(getGroup(id));
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, id]);

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
      <Container>
        <Paper elevation={3}>
          <Header title={name} create={false} goBack={true} />
          {currentGroup.length > 0 ? (
            <>
              <Typography variant="p" sx={{ width: "100%", mb: 1, pl: 5 }}>
                {calculateTotals(currentGroup)}
                <Divider />
              </Typography>

              <Table
                columns={investmentTableColumns}
                rows={currentGroup}
                cells={investmentCells}
                actions={false}
              />
            </>
          ) : (
            <Typography variant="h6" sx={{ width: "100%", mb: 1, pl: 5, textAlign: 'center' }}>
              {t('noData')}
              <Divider />
            </Typography>
          )}
        </Paper>
      </Container>
      <AddLine />
    </>
  );
};

export default GroupInvestments;
