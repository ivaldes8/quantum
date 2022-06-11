import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { logout, reset } from "../../core/redux/features/auth/authSlice";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Tooltip,
  MenuItem,
  Divider,
  Container,
} from "@mui/material";

import { Login, AccountBalanceWallet, Translate, Person } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

const DesktopNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const [anchorElLanguage, setAnchorElLanguage] = useState(null);

  const pages = [
    { name: "Home", route: "/home" },
    { name: "Dashboard", route: "/dashboard" },
    { name: "InvestmentGroups", route: "/group" },
    { name: "Investments", route: "/investment" },
  ];
  const settings = [{name: "Profile", route: "/profile"}, {name: "Logout", route: "/"}];
  const languages = ["Español", "English"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenLanguageMenu = (event) => {
    setAnchorElLanguage(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
    setAnchorElUser(null);
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountBalanceWallet
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QUANTUM
          </Typography>

          {user && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.route}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      variant={location.pathname.includes(page.route) ? "h5" : "p"}
                      textAlign="center"
                    >
                      {t(page.name)}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <AccountBalanceWallet
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            QUANTUM
          </Typography>
          {user && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.route}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography
                      variant={location.pathname.includes(page.route) ? "h5" : "p"}
                      textAlign="center"
                    >
                      {t(page.name)}
                    </Typography>
                  </MenuItem>
                ))}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={t("Actions")}>
                  <IconButton
                    onClick={handleOpenUserMenu}
                    color="inherit"
                    sx={{ marginRight: 2 }}
                  >
                    <Person fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    // <MenuItem
                    //   key={setting}
                    //   onClick={
                    //     setting === "Logout" ? onLogout : handleCloseUserMenu
                    //   }
                    // >
                    //   <Typography textAlign="center">{t(setting)}</Typography>
                    // </MenuItem>



                  <MenuItem
                    key={setting.name}
                    component={Link}
                    to={setting.route}
                    onClick={setting.name === "Logout" ? onLogout : handleCloseUserMenu}
                  >
                    <Typography
                      variant={setting.name !== "Logout" && location.pathname.includes(setting.route) ? "h5" : "p"}
                      textAlign="center"
                    >
                      {t(setting.name)}
                    </Typography>
                  </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
          {!user && (
            <Box sx={{ flexGrow: 0 }}>
              <MenuItem component={Link} to="login">
                <Login sx={{ marginRight: 1 }} />
                <Typography
                  variant={location.pathname === "login" ? "h5" : "h6"}
                  textAlign="center"
                >
                  {t("Login")}
                </Typography>
              </MenuItem>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <IconButton aria-label="language" onClick={handleOpenLanguageMenu}>
              <Translate style={{ color: "white" }} />
            </IconButton>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElLanguage}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
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
      </Container>
    </AppBar>
  );
};

export default DesktopNav;
