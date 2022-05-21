import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../core/redux/features/auth/authSlice";

import { styled } from "@mui/material/styles";
import {
  Tooltip,
  Divider,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Fab,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Logout,
  PieChart,
  Translate,
  CurrencyExchange,
  TableChart,
  AccountBalanceWallet,
  Login,
  Person,
} from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
  width: 60,
  height: 60,
});

const MobileNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

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

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <AccountBalanceWallet sx={{ display: { md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
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
          {user && (
            <Tooltip title={t("Dashboard")} sx={{ marginLeft: -2 }}>
              <IconButton
                aria-label="open drawer"
                component={Link}
                to="/dashboard"
                color={
                  location.pathname.includes("/dashboard")
                    ? "secondary"
                    : "inherit"
                }
              >
                <TableChart fontSize="large" />
              </IconButton>
            </Tooltip>
          )}

          {user && (
            <Tooltip title={t("InvestmentIdeas")}>
              <IconButton
                aria-label="open drawer"
                component={Link}
                to="/recomended"
                color={
                  location.pathname.includes("/recomended")
                    ? "secondary"
                    : "inherit"
                }
              >
                <CurrencyExchange fontSize="large" />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title={t("Home")}>
            <IconButton
              aria-label="open drawer"
              component={Link}
              to="/home"
              color={
                location.pathname.includes("/home") || location.pathname === "/"
                  ? "secondary"
                  : "inherit"
              }
            >
              <PieChart fontSize="large" />
            </IconButton>
          </Tooltip>

          <Tooltip title={t(user ? "Investments" : "Login")}>
            <StyledFab
              color={
                location.pathname.includes("/investment") ? "secondary" : "info"
              }
              aria-label="add"
              component={Link}
              to={user ? "/investment" : "Login"}
            >
              {user ? (
                <AccountBalanceWallet
                  sx={{ display: { md: "flex" }, fontSize: 40 }}
                />
              ) : (
                <Login sx={{ display: { md: "flex" }, fontSize: 40 }} />
              )}
            </StyledFab>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          {user && (
            <>
              <Tooltip title={t("Profile")}>
                <IconButton
                  color={
                    location.pathname.includes("/profile")
                      ? "secondary"
                      : "inherit"
                  }
                  component={Link}
                  to="/profile"
                >
                  <Person fontSize="large" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t("Logout")} onClick={onLogout}>
                <IconButton color="inherit" aria-label="open drawer">
                  <Logout fontSize="large" />
                </IconButton>
              </Tooltip>
            </>
          )}

          <Box sx={{ flexGrow: 0, marginRight: -2 }}>
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
