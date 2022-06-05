import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  getGroups,
  reset,
  createGroup,
  updateGroup,
  deleteGroup
} from "../../core/redux/features/groups/groupSlice";

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
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";



const Group = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { groups, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.group
  );

  const [openModal, setOpenModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const handleCreateGroup = () => {
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
    console.log(data, 'data')
    navigate(`/group/${data.name}/${data._id}`)
  }

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onCloseConfModal = () => {
    setOpenConfModal(false);
  };

  const submitModal = (data) => {
    if (isEdit) {
      dispatch(updateGroup(data));
      if (isSuccess && !isError) {
        toast.success(t("groupUpdated"));
      }
    } else {
      dispatch(createGroup(data));
      if (isSuccess && !isError) {
        toast.success(t("groupCreated"));
      }
    }
    setOpenModal(false);
  };

  const onDeleteModal = () => {
    setOpenConfModal(false)
    dispatch(deleteGroup(toDelete));
      if (isSuccess && !isError) {
        toast.success(t("groupDeleted"));
      }
  }
 
  useEffect(() => {
    dispatch(getGroups());
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
          <Header title="investmentGroups" onClickHandler={handleCreateGroup} />
          <CardList
            list={groups}
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
        title={isEdit ? "EditGroup" : "CreateGroup"}
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
          multiline
          validate={composeValidators(required)}
        />
      </DialogForm>
      <DialogConfirmation
        title="DeleteGroup"
        confirmationText="deleteGroupConfirmation"
        valueToShow={toDelete?.name ? toDelete.name : ""}
        openModal={openConfModal}
        onCloseModal={onCloseConfModal}
        onSubmitModal={onDeleteModal}
      />
    </>
  );
}

export default Group