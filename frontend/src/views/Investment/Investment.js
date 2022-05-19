import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  getInvestments,
  reset,
  createInvestment
} from "../../core/redux/features/investments/investmentSlice";
import {
  composeValidators,
  required,
} from "../../core/custom-components/validations/InputErrors";

import TextField from "../../core/custom-components/form-elements/TextField";

import { Container, Paper } from "@mui/material";
import AddLine from "../../core/custom-components/AddLine";
import CardList from "../../core/custom-components/cardList/cardList";
import Header from "../../core/custom-components/Header";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import Loading from "../../core/custom-components/Loading";

const Investment = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { investments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.investment
  );
  
  const [openModal, setOpenModal] = useState(false);

  const handleCreateInvestment = () => {
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const submitModal = (data) => {
    dispatch(createInvestment(data))
    if (isSuccess && !isError) {
      toast.success(t('investmentCreated'));
    }
    setOpenModal(false);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getInvestments());
    return () => {
      dispatch(reset())
    }
    
  }, [isError, message, navigate, dispatch]);

  if(isLoading){
    return <Loading/>
  }

  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3}>
          <Header title="Investments" onClickHandler={handleCreateInvestment} />
          <CardList list={investments} titleKey='name' descKey='description'/>
        </Paper>
      </Container>
      <AddLine />
      <DialogForm
        title="CreateInvestment"
        submitText="Save"
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSubmitModal={submitModal}
      >
        <TextField
          field="name"
          label="name"
          validate={composeValidators(required)}
        />
        <TextField
          field="description"
          label="Description"
          multiline
          validate={composeValidators(required)}
        />
      </DialogForm>
    </>
  );
};

export default Investment;
