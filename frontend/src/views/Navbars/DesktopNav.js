import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

import { useTranslation } from "react-i18next";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Translate from "@mui/icons-material/Translate";
import { Divider } from "@mui/material";

const DesktopNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation()

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [anchorElLanguage, setAnchorElLanguage] = useState(null);

  const pages = [{name:"Dashboard", route: "/dashboard"}, {name:"InvestmentIdeas", route: "/recomended"}, {name:"Home", route: "/home"}, {name:"Investments", route: "/investments"}];
  const settings = ["Profile", "Logout"];
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountBalanceWalletIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
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
                <MenuItem key={page.name} component={Link} to={page.route} onClick={handleCloseNavMenu}>
                  <Typography variant={location.pathname === page.route ? 'h5' : 'p'} textAlign="center">{t(page.name)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AccountBalanceWalletIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
            <MenuItem key={page.name} component={Link} to={page.route} onClick={handleCloseNavMenu}>
            <Typography variant={location.pathname === page.route ? 'h5' : 'p'} textAlign="center">{t(page.name)}</Typography>
          </MenuItem>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={t('Actions')}>
              <IconButton onClick={handleOpenUserMenu} sx={{ marginRight: 2 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{t(setting)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

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
