import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import { Button, Divider, Typography, IconButton } from "@mui/material";
import { Add, ArrowBack, Edit } from "@mui/icons-material";

const Header = ({
  create = true,
  edit = false,
  goBack = false,
  title = "",
  valueTitle = "",
  onClickHandler,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <div style={{ display: "flex" }}>
        {goBack && (
          <IconButton color="secondary" onClick={() => navigate(-1)}>
            <ArrowBack fontSize="large" />
          </IconButton>
        )}

        <Typography
          variant="h5"
          sx={{ flexGrow: 20, margin: 1, marginTop: 1.5 }}
        >
          {t(title)} {valueTitle}
        </Typography>
        {create && (
          <Button
            variant="contained"
            color="primary"
            sx={{ flexGrow: 1, margin: 1, height: 40 }}
            onClick={onClickHandler}
          >
            <Add style={{ marginLeft: -10 }} /> {t("Create")}
          </Button>
        )}
        {edit && (
          <Button
            variant="contained"
            color="primary"
            sx={{ flexGrow: 1, margin: 1, height: 40 }}
            onClick={onClickHandler}
          >
            <Edit style={{ marginLeft: -10 }} /> {t("Edit")}
          </Button>
        )}
      </div>
      <Divider />
    </>
  );
};

export default Header;
