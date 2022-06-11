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

import {
  composeValidators,
  required,
  email
} from "../../core/custom-components/validations/InputErrors";

import TextField from "../../core/custom-components/form-elements/TextField";
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

  const { currentUser, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const [openModal, setOpenModal] = useState(false);
  const [toEdit, setToEdit] = useState(null);

  const handleOnEdit = () => {
    setToEdit(currentUser);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const submitModal = (data) => {
    const toSend = {
      name: data.name,
      email: data.email,
      lastName: data.lastName
    }
    dispatch(updateCurrentUser(toSend));

    if (isSuccess && !isError) {
      toast.success(t("profileUpdated"));
    }
    setOpenModal(false);
  };

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
  }, [isError, message])

  if (isLoading) {
    return <Loading />;
  }


  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3} style={{ marginBottom: 20 }}>
          <Header title="userProfile" create={false} edit={true} onClickHandler={handleOnEdit} />

          {currentUser &&
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>{t('name')}:</Typography>
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
                  <Typography>{t('lastName')}:</Typography>
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
                  <Typography>{t('email')}:</Typography>
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
                  <Typography>{t('role')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{currentUser.role}</Typography>
                </AccordionDetails>
              </Accordion>
            </>
          }
        </Paper>
      </Container>

      <AddLine />
      <DialogForm
        title="EditProfile"
        submitText="Edit"
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
          field="lastName"
          label="lastName"
          validate={composeValidators(required)}
        />
        <TextField
          field="email"
          label="email"
          validate={composeValidators(required, email)}
        />
      </DialogForm>
    </>
  )
}

export default Profile