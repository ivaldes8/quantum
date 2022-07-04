import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
    getExchanges,
    reset,
    createExchange,
    updateExchange,
    deleteExchange
} from "../../core/redux/features/exchange/exchangeSlice";

import { getCurrencies } from "../../core/redux/features/currency/currencySlice";

import { composeValidators, required } from "../../core/custom-components/validations/InputErrors";

import TextField from "../../core/custom-components/form-elements/TextField";
import SimpleSelect from "../../core/custom-components/form-elements/SelectSimple/index";
import Table from "../../core/custom-components/table/Table";
import Header from "../../core/custom-components/Header";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import Loading from "../../core/custom-components/Loading";
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";

import { Paper } from "@mui/material";

const ProfileExchangeManagement = ({ userCurrency = '' }) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { exchanges, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.exchange
    );

    const { currencies } = useSelector((state) => state.currency);

    const [openModal, setOpenModal] = useState(false);
    const [openConfModal, setOpenConfModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [toEdit, setToEdit] = useState(null);
    const [toDelete, setToDelete] = useState(null);

    const exchangeTableColumns = [
        {
            id: "currency",
            numeric: false,
            disablePadding: false,
            label: "currency",
        },
        {
            id: "change",
            numeric: true,
            disablePadding: false,
            label: "exchange",
        }
    ];

    const exchangeCells = ["currencyM", "change"];

    const handleExchange = () => {
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
            currency: data.currency._id,
            change: data.change
        }
        if (isEdit) {
            dispatch(updateExchange({ ...toSend, _id: data._id }));
            if (isSuccess && !isError) {
                toast.success(t("homeCardUpdated"));
            }
        } else {
            dispatch(createExchange(toSend));
            if (isSuccess && !isError) {
                toast.success(t("homeCardCreated"));
            }
        }
        setOpenModal(false);
    };

    const onDeleteModal = () => {
        setOpenConfModal(false)
        dispatch(deleteExchange(toDelete));
        if (isSuccess && !isError) {
            toast.success(t("homeCardDeleted"));
        }
    }

    useEffect(() => {
        dispatch(getCurrencies());
    }, []);

    useEffect(() => {
        dispatch(getExchanges());
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
        return <Loading w="80%" h="50%" z={100} />;
    }

    return (
        <>

            <Paper elevation={3}>
                <Header title="exchange" valueTitle={userCurrency} onClickHandler={handleExchange} />
                <Table
                    columns={exchangeTableColumns}
                    rows={exchanges}
                    cells={exchangeCells}
                    handleEdit={handleOnEdit}
                    handleDelete={handleOnDelete}
                />
            </Paper>
            <DialogForm
                title={isEdit ? "EditExchange" : "CreateExchange"}
                submitText={isEdit ? "Edit" : "Save"}
                openModal={openModal}
                onCloseModal={onCloseModal}
                onSubmitModal={submitModal}
                data={toEdit}
            >
                <SimpleSelect
                    field="currency"
                    label="currency"
                    selectkey="name"
                    simple={false}
                    options={currencies}
                    validate={composeValidators(required)}
                />
                <TextField
                    field="change"
                    label="exchange"
                    type="number"
                    validate={composeValidators(required)}
                />
            </DialogForm>
            <DialogConfirmation
                title="DeleteExchange"
                confirmationText="deleteExchangeConfirmation"
                valueToShow={toDelete?.name ? toDelete.name : ""}
                openModal={openConfModal}
                onCloseModal={onCloseConfModal}
                onSubmitModal={onDeleteModal}
            />
        </>
    )
}

export default ProfileExchangeManagement