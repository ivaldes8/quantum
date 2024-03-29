import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import {
  getActions,
  reset,
  createAction,
  updateAction,
  deleteAction,
} from "../../core/redux/features/actions/actionSlice";

import Format from "../../core/formats/Format";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import TextField from "../../core/custom-components/form-elements/TextField";
import Header from "../../core/custom-components/Header";
import Table from "../../core/custom-components/table/Table";
import AddLine from "../../core/custom-components/AddLine";
import Loading from "../../core/custom-components/Loading";
import {
  composeValidators,
  required,
} from "../../core/custom-components/validations/InputErrors";
import { Container, Divider, Paper, Typography } from "@mui/material";
import TextDatePicker from "../../core/custom-components/form-elements/TextDatePicker/index";
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";

const InvestmentActions = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { actions, isLoading, isError, isSuccess, message, isCreated, isUpdated, isDeleted } = useSelector(
    (state) => state.action
  );

  const { id, name, currency } = useParams();

  const [openModal, setOpenModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const actionTableColumns = [
    {
      id: "amount",
      numeric: true,
      disablePadding: true,
      label: "deposit",
    },
    {
      id: "feedback",
      numeric: true,
      disablePadding: false,
      label: "return",
    },
    {
      id: "reason",
      numeric: false,
      disablePadding: false,
      label: "reason",
    },
    {
      id: "date",
      numeric: true,
      disablePadding: false,
      label: "date",
    },
  ];

  const actionCells = ["amount", "feedback", "reason", "date"];

  const handleCreateAction = () => {
    setIsEdit(false);
    setToEdit(null);
    setOpenModal(true);
  };

  const handleOnEdit = (data) => {
    setIsEdit(true);
    const ToEdit = {
      ...data,
      date: moment(data.date).utc().format("yyyy-MM-DD"),
    };
    setToEdit(ToEdit);
    setOpenModal(true);
  };

  const handleOnDelete = (data) => {
    setToDelete(data._id);
    setOpenConfModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCloseConfModal = () => {
    setOpenConfModal(false);
  };

  const submitModal = (data) => {
    if (isEdit) {
      dispatch(updateAction(data));
    } else {
      const toSend = { ...data, id };
      dispatch(createAction(toSend));
    }
    setOpenModal(false);
  };

  const onDeleteModal = () => {
    setOpenConfModal(false);
    dispatch(deleteAction(toDelete));
  };

  const calculateTotals = (list) => {
    let amount = 0;
    let feedBack = 0;
    list.map((l) => {
      amount += l.amount;
      feedBack += l.feedback;
    });
    return ` ${t("totals")}: ${Format.formatCurrency(
      amount
    )} / ${Format.formatCurrency(feedBack)} = ${Format.formatCurrency(-amount + feedBack)} - ${currency}`;
  };

  useEffect(() => {
    dispatch(getActions(id));
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && isCreated && !isError) {
      toast.success(t("actionCreated"));
    }
    if (isSuccess && isUpdated && !isError) {
      toast.success(t("actionUpdated"));
    }
    if (isSuccess && isDeleted && !isError) {
      toast.success(t("actionDeleted"));
    }
  }, [isError, message, isSuccess, isDeleted, isCreated, isUpdated, dispatch])

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3}>
          <Header title={name} onClickHandler={handleCreateAction} goBack={true} />

          <Typography variant="p" sx={{ width: "100%", mb: 1, pl: 5 }}>
            {calculateTotals(actions)}
            <Divider />
          </Typography>

          <Table
            columns={actionTableColumns}
            rows={actions}
            cells={actionCells}
            handleEdit={handleOnEdit}
            handleDelete={handleOnDelete}
          />
        </Paper>
      </Container>
      <AddLine />
      <DialogForm
        title={isEdit ? "EditAction" : "CreateAction"}
        submitText={isEdit ? "Edit" : "Save"}
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSubmitModal={submitModal}
        data={toEdit}
      >
        <TextField
          field="amount"
          label="deposit"
          type="number"
          validate={composeValidators(required)}
        />
        <TextField
          field="feedback"
          label="return"
          type="number"
          validate={composeValidators(required)}
        />
        <TextField
          field="reason"
          label="reason"
          rows={5}
          multiline
        />
        <TextDatePicker
          field="date"
          label="date"
          type="date"
          validate={composeValidators(required)}
        />
      </DialogForm>
      <DialogConfirmation
        title="DeleteAction"
        confirmationText="deleteActionConfirmation"
        valueToShow={toDelete?.deposit ? toDelete.deposit : ""}
        openModal={openConfModal}
        onCloseModal={onCloseConfModal}
        onSubmitModal={onDeleteModal}
      />
    </>
  );
};

export default InvestmentActions;
