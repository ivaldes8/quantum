import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
    getHomeCards,
    reset,
    createHomeCard,
    updateHomeCard,
    deleteHomeCard
} from "../../core/redux/features/homeCards/homeCardSlice";
import {
    composeValidators,
    required,
    fileSizeLess250
} from "../../core/custom-components/validations/InputErrors";

import TextField from "../../core/custom-components/form-elements/TextField";
import CardList from "../../core/custom-components/cardList/cardList";
import Header from "../../core/custom-components/Header";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import Loading from "../../core/custom-components/Loading";
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";
import FileFieldInput from "../../core/custom-components/form-elements/FileField";

import { Paper } from "@mui/material";

const HomeCardManagement = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { homeCards, isLoading, isError, isSuccess, message, isCreated, isUpdated, isDeleted } = useSelector(
        (state) => state.homeCard
    );

    const [openModal, setOpenModal] = useState(false);
    const [openConfModal, setOpenConfModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [toEdit, setToEdit] = useState(null);
    const [toDelete, setToDelete] = useState(null);

    const handleCreateHomeCard = () => {
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
        if (isEdit) {
            dispatch(updateHomeCard(data));
        } else {
            dispatch(createHomeCard(data));
        }
        setOpenModal(false);
    };

    const onDeleteModal = () => {
        setOpenConfModal(false)
        dispatch(deleteHomeCard(toDelete));
    }

    useEffect(() => {
        dispatch(getHomeCards());
        return () => {
            dispatch(reset());
        };
    }, [navigate, dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
          }
          if (isSuccess && isCreated && !isError) {
            toast.success(t("homeCardCreated"));
          }
          if (isSuccess && isUpdated && !isError) {
            toast.success(t("homeCardUpdated"));
          }
          if (isSuccess && isDeleted && !isError) {
            toast.success(t("homeCardDeleted"));
          }
    }, [isError, message, isSuccess, isDeleted, isCreated, isUpdated, dispatch])

    if (isLoading) {
        return <Loading w="80%" h="50%" z={100} />;
    }

    return (
        <>

            <Paper elevation={3}>
                <Header title="homeCards" onClickHandler={handleCreateHomeCard} />
                <CardList
                    clickeable={false}
                    list={homeCards}
                    onEditHandler={handleOnEdit}
                    onDeleteHandler={handleOnDelete}
                    titleKey="title"
                    descKey="description"
                />
            </Paper>
            <DialogForm
                title={isEdit ? "EditHomeCard" : "CreateHomeCard"}
                submitText={isEdit ? "Edit" : "Save"}
                openModal={openModal}
                onCloseModal={onCloseModal}
                onSubmitModal={submitModal}
                data={toEdit}
            >
                <TextField
                    field="title"
                    label="title"
                    validate={composeValidators(required)}
                />
                <TextField
                    field="description"
                    label="Description"
                    rows={5}
                    multiline
                    validate={composeValidators(required)}
                />
                <FileFieldInput
                    field="img"
                    label="Image"
                    validate={composeValidators(fileSizeLess250)}
                />
            </DialogForm>
            <DialogConfirmation
                title="DeleteHomeCard"
                confirmationText="deleteHomeCardConfirmation"
                valueToShow={toDelete?.name ? toDelete.name : ""}
                openModal={openConfModal}
                onCloseModal={onCloseConfModal}
                onSubmitModal={onDeleteModal}
            />
        </>
    )
}

export default HomeCardManagement