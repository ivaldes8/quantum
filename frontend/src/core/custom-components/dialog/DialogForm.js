/* eslint-disable no-self-compare */
import React from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-final-form";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogForm = ({
  children,
  closeIcon = true,
  showActions = true,
  disableSubmit = false,
  data,
  submitText = "Save",
  title = "Title",
  openModal,
  onCloseModal,
  onSubmitModal,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={openModal}
      onClose={onCloseModal}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <Form
        onSubmit={onSubmitModal}
        initialValues={data}
        render={({ handleSubmit}) => (
          <>
            <form onSubmit={handleSubmit} noValidate>
              <DialogTitle id="scroll-dialog-title">
                {t(title)}
                {closeIcon && (
                  <IconButton
                    aria-label="close"
                    onClick={onCloseModal}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              </DialogTitle>
              <DialogContent dividers={"paper" === "paper"}>
                <Container>{children}</Container>
              </DialogContent>
              {showActions && (
                <DialogActions>
                  <Button onClick={onCloseModal}>{t('Cancel')}</Button>
                  <Button disabled={disableSubmit} variant="contained" type="submit">
                    {t(submitText)}
                  </Button>
                </DialogActions>
              )}
            </form>
          </>
        )}
      />
    </Dialog>
  );
};

export default DialogForm;
