import React from "react";
import { useTranslation } from "react-i18next";

import { Button, Divider, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

const Header = ({ create = true, title, valueTitle = '', onClickHandler }) => {
  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: "flex" }}>
        <Typography variant="h5" sx={{ flexGrow: 20, margin: 1 }}>
          {t(title)} {valueTitle}
        </Typography>
        {create && (
          <Button
            variant="contained"
            color="primary"
            sx={{ flexGrow: 1, margin: 1 }}
            onClick={onClickHandler}
          >
            <Add style={{ marginLeft: -10 }} /> {t("Create")}
          </Button>
        )}
      </div>
      <Divider />
    </>
  );
};

export default Header;
