import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  getHome,
  updateHome,
  reset
} from "../../core/redux/features/home/homeSlice";

import { getHomeCards } from "../../core/redux/features/homeCards/homeCardSlice";

import {
  composeValidators,
  required,
} from "../../core/custom-components/validations/InputErrors";

import TextField from "../../core/custom-components/form-elements/TextField";
import Select from "../../core/custom-components/form-elements/SelectMulti/index"
import AddLine from "../../core/custom-components/AddLine";
import Header from "../../core/custom-components/Header";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import Loading from "../../core/custom-components/Loading";

import { AccordionDetails, AccordionSummary, Container, Paper, Typography, Accordion } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import CardList from "../../core/custom-components/cardList/cardList";

import HomeCardManagement from "./HomeCardManagement";

const HomeManagement = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { home, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.home
  );

  const { homeCards } = useSelector(
    (state) => state.homeCard
  );

  const [openModal, setOpenModal] = useState(false);
  const [toEdit, setToEdit] = useState(null);

  const handleOnEdit = () => {
    setToEdit(home[0]);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const submitModal = (data) => {
    const toSend = {
      _id: data._id,
      aboutTitle: data.aboutTitle,
      aboutDescription: data.aboutDescription,
      fraseTitle: data.fraseTitle,
      fraseDescription: data.fraseDescription,
      name: data.name,
      portafolio: data.portafolio,
      email: data.email,
      cards: data.cards.map((i) => i._id)
    }

    dispatch(updateHome(toSend));

    if (isSuccess && !isError) {
      toast.success(t("homeUpdated"));
    }
    setOpenModal(false);
  };

  useEffect(() => {
    dispatch(getHomeCards());
    dispatch(getHome());
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
          <Header title="homeManagment" create={false} edit={true} onClickHandler={handleOnEdit} />

          {home && home.length && home.length > 0 &&
            <>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{t('aboutTitle')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{home[0].aboutTitle}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>{t('aboutDescription')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{home[0].aboutDescription}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>{t('fraseTitle')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{home[0].fraseTitle}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>{t('fraseDescription')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{home[0].fraseDescription}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography>{t('name')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{home[0].name}</Typography>
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
                  <Typography variant="p">{home[0].email}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography>{t('portafolio')}:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="p">{home[0].portafolio}</Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography>Cards:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <CardList
                    list={home[0].cards}
                    clickeable={false}
                    editable={false}
                    deleteable={false}
                    titleKey="title"
                    descKey="description"
                  />
                </AccordionDetails>
              </Accordion>
            </>
          }
        </Paper>
        <HomeCardManagement />
      </Container>

      <AddLine />
      <DialogForm
        title="EditHome"
        submitText="Edit"
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSubmitModal={submitModal}
        data={toEdit}
      >
        <TextField
          field="aboutTitle"
          label="aboutTitle"
          validate={composeValidators(required)}
        />
        <TextField
          field="aboutDescription"
          label="aboutDescription"
          multiline
        />
        <TextField
          field="fraseTitle"
          label="fraseTitle"
          validate={composeValidators(required)}
        />
        <TextField
          field="fraseDescription"
          label="fraseDescription"
          multiline
        />
        <TextField
          field="name"
          label="name"
          validate={composeValidators(required)}
        />
        <TextField
          field="email"
          label="email"
          validate={composeValidators(required)}
        />
        <TextField
          field="portafolio"
          label="portafolio"
        />

        <Select
          field="cards"
          label="Cards"
          selectkey="title"
          options={homeCards}
          validate={composeValidators(required)}
        />
      </DialogForm>
    </>
  )
}

export default HomeManagement