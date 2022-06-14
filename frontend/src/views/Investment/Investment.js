import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  getInvestments,
  reset,
  createInvestment,
  updateInvestment,
  deleteInvestment
} from "../../core/redux/features/investments/investmentSlice";

import { getCurrencies } from "../../core/redux/features/currency/currencySlice";

import {
  composeValidators,
  required,
} from "../../core/custom-components/validations/InputErrors";

import TextField from "../../core/custom-components/form-elements/TextField";
import SimpleSelect from "../../core/custom-components/form-elements/SelectSimple/index";
import AddLine from "../../core/custom-components/AddLine";
import CardList from "../../core/custom-components/cardList/cardList";
import Header from "../../core/custom-components/Header";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import Loading from "../../core/custom-components/Loading";
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";

import { Container, Paper } from "@mui/material";

const Investment = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { investments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.investment
  );

  const { currencies } = useSelector(
    (state) => state.currency
  );

  const [openModal, setOpenModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const handleCreateInvestment = () => {
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

  const handleOnSelect = (data) => {
    navigate(`/investment/${data.name}/${data._id}`)
  }

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCloseConfModal = () => {
    setOpenConfModal(false);
  };

  const submitModal = (data) => {
    if (isEdit) {
      dispatch(updateInvestment(data));
      if (isSuccess && !isError) {
        toast.success(t("investmentUpdated"));
      }
    } else {
      dispatch(createInvestment(data));
      if (isSuccess && !isError) {
        toast.success(t("investmentCreated"));
      }
    }
    setOpenModal(false);
  };

  const onDeleteModal = () => {
    setOpenConfModal(false)
    dispatch(deleteInvestment(toDelete));
    if (isSuccess && !isError) {
      toast.success(t("investmentDeleted"));
    }
  }

  useEffect(() => {
    dispatch(getCurrencies());
    dispatch(getInvestments());
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

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
          <Header title="Investments" onClickHandler={handleCreateInvestment} />
          <CardList
            list={investments}
            onEditHandler={handleOnEdit}
            onDeleteHandler={handleOnDelete}
            onSelectHandler={handleOnSelect}
            titleKey="name"
            descKey="description"
          />
        </Paper>
      </Container>
      <AddLine />
      <DialogForm
        title={isEdit ? "EditInvestment" : "CreateInvestment"}
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
        <TextField
          field="description"
          label="Description"
          rows={5}
          multiline
          validate={composeValidators(required)}
        />
         <SimpleSelect
          field="currency"
          label="currency"
          options={currencies}
          validate={composeValidators(required)}
        />
      </DialogForm>
      <DialogConfirmation
        title="DeleteInvestment"
        confirmationText="deleteInvestmentConfirmation"
        valueToShow={toDelete?.name ? toDelete.name : ""}
        openModal={openConfModal}
        onCloseModal={onCloseConfModal}
        onSubmitModal={onDeleteModal}
      />
    </>
  );
};

export default Investment;
