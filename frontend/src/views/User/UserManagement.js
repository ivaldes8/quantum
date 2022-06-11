import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getUsers,
  reset,
  createUser,
  updateUser,
  deleteUser,
} from "../../core/redux/features/user/userSlice";

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

const UserManagement = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const [openModal, setOpenModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const userTableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "name",
    },
    {
      id: "lastName",
      numeric: false,
      disablePadding: false,
      label: "lastName",
    },
    {
      id: "email",
      numeric: false,
      disablePadding: false,
      label: "email",
    },
    {
      id: "role",
      numeric: false,
      disablePadding: false,
      label: "role",
    },
  ];

  const userCells = ["name", "lastName", "email", "role"];

  const roles = [{_id: 'Admin', name: 'Admin'}, {_id: 'User', name: 'User'}]

  const handleCreateUser = () => {
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
      name: data.name,
      email: data.email,
      lastName: data.lastName,
      role: data.role
    }
    if (isEdit) {
      dispatch(updateUser({ ...toSend, _id: data._id }));
      if (isSuccess && !isError) {
        toast.success(t("userUpdated"));
      }
    } else {
      dispatch(createUser({...toSend, password: data.password}));
      if (isSuccess && !isError) {
        toast.success(t("userCreated"));
      }
    }
    setOpenModal(false);
  };

  const onDeleteModal = () => {
    setOpenConfModal(false);
    dispatch(deleteUser(toDelete));
    if (isSuccess && !isError) {
      toast.success(t("userDeleted"));
    }
  };

  useEffect(() => {
    dispatch(getUsers());
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
          <Header title={'usersManagment'} onClickHandler={handleCreateUser} goBack={false} />
          <Table
            columns={userTableColumns}
            rows={users}
            cells={userCells}
            handleEdit={handleOnEdit}
            handleDelete={handleOnDelete}
          />
        </Paper>
      </Container>
      <AddLine />
      <DialogForm
        title={isEdit ? "EditUser" : "CreateUser"}
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
          field="lastName"
          label="lastName"
          validate={composeValidators(required)}
        />
        <TextField
          field="email"
          label="email"
          validate={composeValidators(required, email)}
        />
        <TextField
          field="role"
          label="role"
          validate={composeValidators(required, validRole)}
        />
        {!isEdit &&
          <TextField
            field="password"
            label="password"
            type="password"
            validate={composeValidators(required)}
          />
        }
      </DialogForm>
      <DialogConfirmation
        title="DeleteUser"
        confirmationText="deleteUserConfirmation"
        valueToShow={toDelete?.name ? toDelete.name : ""}
        openModal={openConfModal}
        onCloseModal={onCloseConfModal}
        onSubmitModal={onDeleteModal}
      />
    </>
  )
}

export default UserManagement