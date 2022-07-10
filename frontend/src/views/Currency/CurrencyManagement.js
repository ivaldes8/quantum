import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getCurrencies,
  reset,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} from "../../core/redux/features/currency/currencySlice";

import DialogForm from "../../core/custom-components/dialog/DialogForm";
import TextField from "../../core/custom-components/form-elements/TextField";
import Header from "../../core/custom-components/Header";
import Table from "../../core/custom-components/table/Table";
import AddLine from "../../core/custom-components/AddLine";
import Loading from "../../core/custom-components/Loading";
import {
  composeValidators,
  required,
  email,
  validRole
} from "../../core/custom-components/validations/InputErrors";
import { Container, Divider, Paper, Typography } from "@mui/material";
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";

const CurrencyManagement = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currencies, isLoading, isError, isSuccess, message, isCreated, isUpdated, isDeleted } = useSelector(
    (state) => state.currency
  );

  const [openModal, setOpenModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const currencyTableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "name",
    }
  ];

  const currencyCells = ["name"];

  const handleCreateCurrency = () => {
    setIsEdit(false);
    setToEdit(null);
    setOpenModal(true);
  };

  const handleOnEdit = (data) => {
    setIsEdit(true);
    setToEdit(data);
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
    const toSend = {
      _id: data._id,
      name: data.name
    }
    if (isEdit) {
      dispatch(updateCurrency(toSend));
    } else {
      dispatch(createCurrency(toSend));
    }
    setOpenModal(false);
  };

  const onDeleteModal = () => {
    setOpenConfModal(false);
    dispatch(deleteCurrency(toDelete));
  };

  useEffect(() => {
    dispatch(getCurrencies());
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && isCreated && !isError) {
      toast.success(t("currencyCreated"));
    }
    if (isSuccess && isUpdated && !isError) {
      toast.success(t("currencyUpdated"));
    }
    if (isSuccess && isDeleted && !isError) {
      toast.success(t("currencyDeleted"));
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
          <Header title={'currenciesManagment'} onClickHandler={handleCreateCurrency} goBack={false} />
          <Table
            columns={currencyTableColumns}
            rows={currencies}
            cells={currencyCells}
            handleEdit={handleOnEdit}
            handleDelete={handleOnDelete}
          />
        </Paper>
      </Container>
      <AddLine />
      <DialogForm
        title={isEdit ? "EditCurrency" : "CreateCurrency"}
        submitText={isEdit ? "Edit" : "Save"}
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSubmitModal={submitModal}
        data={toEdit}
      >
        <TextField
          field="name"
          label="name"
          validate={composeValidators(required)}
        />
      </DialogForm>
      <DialogConfirmation
        title="DeleteCurrency"
        confirmationText="deleteCurrencyConfirmation"
        valueToShow={toDelete?.name ? toDelete.name : ""}
        openModal={openConfModal}
        onCloseModal={onCloseConfModal}
        onSubmitModal={onDeleteModal}
      />
    </>
  )
}

export default CurrencyManagement