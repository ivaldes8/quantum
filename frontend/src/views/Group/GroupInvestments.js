import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";

import { getGroup, reset, updateGroup } from "../../core/redux/features/groups/groupSlice";

import Format from "../../core/formats/Format";
import DialogForm from "../../core/custom-components/dialog/DialogForm";
import TextField from "../../core/custom-components/form-elements/TextField";
import Header from "../../core/custom-components/Header";
import Table from "../../core/custom-components/table/Table";
import AddLine from "../../core/custom-components/AddLine";
import Loading from "../../core/custom-components/Loading";
import {
  composeValidators,
  required,
} from "../../core/custom-components/validations/InputErrors";
import { Container, Divider, Paper, Typography } from "@mui/material";
import TextDatePicker from "../../core/custom-components/form-elements/TextDatePicker/index";
import DialogConfirmation from "../../core/custom-components/dialog/DialogConfirmation";

const GroupInvestments = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentGroup, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.group
  );

  const { id, name } = useParams();

  // const [investments, setInvestments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openConfModal, setOpenConfModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const investmentTableColumns = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "name",
    },
    {
      id: "description",
      numeric: false,
      disablePadding: false,
      label: "Description",
    },
    {
      id: "deposit",
      numeric: true,
      disablePadding: false,
      label: "deposit",
    },
    {
      id: "feedback",
      numeric: true,
      disablePadding: false,
      label: "return",
    },
  ];

  const investmentCells = ["name", "description", "deposit", "feedback"];

  const handleCreateAction = () => {
    setIsEdit(false);
    setToEdit(null);
    setOpenModal(true);
  };

  const handleOnEdit = (data) => {
    setIsEdit(true);
    const ToEdit = {
      ...data,
      date: moment(data.date).format("yyyy-MM-DD"),
    };
    setToEdit(ToEdit);
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
      //   dispatch(updateAction(data));
      if (isSuccess && !isError) {
        toast.success(t("actionUpdated"));
      }
    } else {
      const toSend = { ...data, id };
      //   dispatch(createAction(toSend));
      if (isSuccess && !isError) {
        toast.success(t("actionCreated"));
      }
    }
    setOpenModal(false);
  };

  const onDeleteModal = () => {
    setOpenConfModal(false);
    // dispatch(deleteAction(toDelete));
    if (isSuccess && !isError) {
      toast.success(t("actionDeleted"));
    }
  };

  const getDeposit = (actions) => {
    let amount = 0;
    actions.map((a) => {
        amount += a.amount;
      })
    return amount;
  };

  const getFeedBack = (actions) => {
    let feedBack = 0;
    actions.map((a) => {
        feedBack += a.feedback;
      })
    return feedBack;
  };

  const calculateTotals = (list) => {
    let amount = 0;
    let feedBack = 0;
    list.map((i) => {
      i.actions.map((a) => {
        amount += a.amount;
        feedBack += a.feedback;
      })
      
    });
    return ` ${t("totals")}: ${Format.formatCurrency(
      amount
    )} - ${Format.formatCurrency(feedBack)}`;
  };

  useEffect(() => {
    dispatch(getGroup(id));
    console.log(currentGroup, 'CG')
    return () => {
      dispatch(reset());
    };
  }, [navigate, dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message])

  // useEffect(() => {
  //   if(currentGroup.length > 0){
  //     let auxArr = []

  //     currentGroup[0].investments.map((i, index) => {
  //       i = { ...i, deposit: getDeposit(i.actions), feedback: getFeedBack(i.actions) }
  //       auxArr.push(i)
  //     })

  //     setInvestments(auxArr)
  //     console.log(auxArr, investments, 'Investments5847')
  //   }
  // }, currentGroup)


  if (isLoading || currentGroup.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3}>
          <Header title={name} create={false} goBack={true} />
          <Typography variant="h6" sx={{ width: "100%", mb: 1, pl: 5 }}>
            {calculateTotals(currentGroup)}
            <Divider />
          </Typography>
          {currentGroup.length > 0 &&
            <Table
              columns={investmentTableColumns}
              rows={currentGroup}
              cells={investmentCells}
              actions={false}
            />
          }
        </Paper>
      </Container>
      <AddLine />
      <DialogForm
        title={isEdit ? "EditAction" : "CreateAction"}
        submitText={isEdit ? "Edit" : "Save"}
        openModal={openModal}
        onCloseModal={onCloseModal}
        onSubmitModal={submitModal}
        data={toEdit}
      >
        <TextField
          field="amount"
          label="deposit"
          type="number"
          validate={composeValidators(required)}
        />
        <TextField
          field="feedback"
          label="return"
          type="number"
          validate={composeValidators(required)}
        />
        <TextDatePicker
          field="date"
          label="date"
          type="date"
          validate={composeValidators(required)}
        />
      </DialogForm>
      <DialogConfirmation
        title="DeleteAction"
        confirmationText="deleteActionConfirmation"
        valueToShow={toDelete?.deposit ? toDelete.deposit : ""}
        openModal={openConfModal}
        onCloseModal={onCloseConfModal}
        onSubmitModal={onDeleteModal}
      />
    </>
  );
};

export default GroupInvestments;
