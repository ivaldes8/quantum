import React from "react";
import { useTranslation } from "react-i18next";

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DialogConfirmation = ({
  openModal,
  onCloseModal,
  onSubmitModal,
  closeIcon = true,
  confirmationText = "deleteConfirmation",
  valueToShow = "",
  submitText = "Delete",
  title = "deleteElement",
  severity = "error"}
) => {
  const { t } = useTranslation();
  return (
    <Dialog
      open={openModal}
      onClose={onCloseModal}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
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
        <Alert severity={severity}>
          {t(confirmationText)} {valueToShow}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseModal}>{t("Cancel")}</Button>
        <Button color='error' variant="contained" onClick={onSubmitModal}>{t(submitText)}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmation;
