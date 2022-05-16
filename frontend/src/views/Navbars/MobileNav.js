import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { styled } from "@mui/material/styles";
import { Tooltip, Divider, AppBar, Box, Toolbar, IconButton, Typography, Fab, Menu, MenuItem, Avatar} from "@mui/material";
import { Logout, PieChart, Translate, CurrencyExchange, TableChart, AccountBalanceWallet} from "@mui/icons-material";


const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  width: 80,
  height: 80

});

const MobileNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const [anchorElLanguage, setAnchorElLanguage] = useState(null);

  const languages = ["Español", "English"];

  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseLanguageMenu = () => {
    setAnchorElLanguage(null);
  };

  const handleSelectedLanguage = (lng) => {
    if (lng?.target?.textContent) {
      i18n.changeLanguage(lng?.target?.textContent === "Español" ? "es" : "en");
    }
    setAnchorElLanguage(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <AccountBalanceWallet sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QUANTUM
          </Typography>
        </Toolbar>
      </AppBar>

      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Tooltip title={t("Dashboard")} >
            <IconButton
              aria-label="open drawer"
              component={Link}
              to="/dashboard"
              color={
                location.pathname === "/dashboard" ? "secondary" : "inherit"
              }
            >
              <TableChart fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("InvestmentIdeas")} sx={{ marginLeft: 2 }}>
            <IconButton
              aria-label="open drawer"
              component={Link}
              to="/recomended"
              color={
                location.pathname === "/recomended" ? "secondary" : "inherit"
              }
            >
              <CurrencyExchange fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("Home")} sx={{ marginLeft: 2 }}>
            <IconButton
              aria-label="open drawer"
              component={Link}
              to="/home"
              color={
                location.pathname === "/home" ? "secondary" : "inherit"
              }
            >
              <PieChart fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title={t("Investments")}>
            <StyledFab
              color={location.pathname === "/investment" ? "secondary" : "info"}
              aria-label="add"
              component={Link}
              to="/investment"
            >
              <AccountBalanceWallet
                sx={{ display: { md: "flex" },fontSize: 40  }}
              />
            </StyledFab>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={t("Profile")} sx={{ marginRight: 2 }}>
            <IconButton>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("Logout")} sx={{ marginRight: 2 }}>
            <IconButton color="inherit" aria-label="open drawer">
              <Logout fontSize="large" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton aria-label="language" onClick={handleOpenLanguageMenu}>
              <Translate style={{ color: "white" }} fontSize="large" />
            </IconButton>

            <Menu
              sx={{ mb: "90px" }}
              id="menu-appbar"
              anchorEl={anchorElLanguage}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElLanguage)}
              onClose={handleCloseLanguageMenu}
            >
              <MenuItem disabled>
                <Typography textAlign="center">
                  {t("selectLanguage")}
                </Typography>
              </MenuItem>
              <Divider />
              {languages.map((lng) => (
                <MenuItem
                  key={lng}
                  onClick={(lng) => handleSelectedLanguage(lng)}
                >
                  <Typography textAlign="center">{lng}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MobileNav;
