import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  getCurrentUser,
  updateCurrentUser,
  reset
} from "../../core/redux/features/user/userSlice";
import { getCurrencies } from "../../core/redux/features/currency/currencySlice";

import {
  composeValidators,
  required,
  equalTo,
  email
} from "../../core/custom-components/validations/InputErrors";

import ProfileExchangeManagement from "./ProfileExchangeManagement";

import TextField from "../../core/custom-components/form-elements/TextField";
import SimpleSelect from "../../core/custom-components/form-elements/SelectSimple/index";
import AddLine from "../../core/custom-components/AddLine";
import Header from "../../core/custom-components/Header";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import Loading from "../../core/custom-components/Loading";

import { AccordionDetails, AccordionSummary, Container, Paper, Typography, Accordion } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const Profile = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoading, isError, isSuccess, message, isUpdated } = useSelector(
    (state) => state.user
  );

  const { currencies } = useSelector((state) => state.currency);

  const [openModal, setOpenModal] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [changePassword, setChangePassword] = useState(false);

  const handleChangePassword = () => {
    setToEdit(currentUser);
    setChangePassword(true)
    setOpenModal(true);
  };

  const handleOnEdit = () => {
    setToEdit(currentUser);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setChangePassword(false)
  };

  const submitModal = (data) => {
    const toSend = {
      name: data.name,
      email: data.email,
      lastName: data.lastName,
      currency: data.currency._id
    }
    const toSendChangePassword = {
      password: data.newPasswordConf
    }
    if (changePassword) {
      dispatch(updateCurrentUser(toSendChangePassword));
    } else {
      dispatch(updateCurrentUser(toSend));
    }
    setOpenModal(false);
    setChangePassword(false)
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  useEffect(() => {
    dispatch(getCurrentUser());
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess && isUpdated && !isError) {
      toast.success(t("profileUpdated"));
    }

  }, [isError, message, isSuccess, isUpdated, dispatch])

  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3} style={{ marginBottom: 20 }}>
          <Header title="userProfile" create={false} edit={true} secundaryButton={true} secundaryButtonText="changePassword" onSecundaryClickHandler={handleChangePassword} onClickHandler={handleOnEdit} />

          {currentUser &&
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography style={{ fontWeight: 600 }}>{t('name')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{currentUser.name}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography style={{ fontWeight: 600 }}>{t('lastName')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{currentUser.lastName}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography style={{ fontWeight: 600 }}>{t('email')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{currentUser.email}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography style={{ fontWeight: 600 }}>{t('currency')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{currentUser.currency ? currentUser.currency.name : ''}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography style={{ fontWeight: 600 }}>{t('role')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{currentUser.role}</Typography>
                </AccordionDetails>
              </Accordion>
            </>
          }
        </Paper>
        <ProfileExchangeManagement userCurrency={currentUser.currency ? currentUser.currency.name : ''} />
      </Container>

      <AddLine />
      <DialogForm
        title={changePassword ? "changePassword" : "EditProfile"}
        submitText="Edit"
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSubmitModal={submitModal}
        data={toEdit}
      >
        {changePassword ? (
          <>
            <TextField
              field="newPassword"
              label="newPassword"
              type="password"
              validate={composeValidators(required)}
            />
            <TextField
              field="newPasswordConf"
              type="password"
              label="newPassowrdConfirmation"
              validate={composeValidators(required, equalTo('newPassword'))}
            />
          </>
        ) : (
          <>
            <TextField
              field="name"
              label="name"
              validate={composeValidators(required)}
            />
            <TextField
              field="lastName"
              label="lastName"
              validate={composeValidators(required)}
            />
            <TextField
              field="email"
              label="email"
              validate={composeValidators(required, email)}
            />
            <SimpleSelect
              field="currency"
              label="currency"
              selectkey="name"
              simple={false}
              options={currencies}
              validate={composeValidators(required)}
            />
          </>
        )}
      </DialogForm>
    </>
  )
}

export default Profile