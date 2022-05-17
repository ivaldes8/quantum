import { useEffect } from "react";
import { Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../core/redux/features/auth/authSlice";

import {
  CircularProgress,
  Box,
  Avatar,
  Button,
  CssBaseline,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { LockOutlined, Login, PersonAdd } from "@mui/icons-material";

import {
  composeValidators,
  email,
  required,
} from "../../core/custom-components/validations/InputErrors";
import TextField from "../../core/custom-components/form-elements/TextField";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const submitForm = (data) => {
    const toSend = { ...data, role: "User" };
    dispatch(register(toSend));
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          width: "100%",
        }}
      >
        <CircularProgress
          style={{ alignSelf: "center", marginTop: "30%" }}
          size={150}
        />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={3}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("SignIn")}
        </Typography>
        <Form
          onSubmit={submitForm}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              <TextField
                className="form-control"
                field="name"
                label="name"
                validate={composeValidators(required)}
              />
              <TextField
                className="form-control"
                field="lastName"
                label="lastName"
                validate={composeValidators(required)}
              />
              <TextField
                className="form-control"
                field="email"
                label="email"
                validate={composeValidators(required, email)}
              />
              <TextField
                className="form-control"
                field="password"
                type="password"
                label="password"
                validate={required}
              />

              <div className="forms-button-container">
                <div className="form-button-left">
                  <Button
                    variant="text"
                    component={Link}
                    to="/login"
                    color="primary"
                    size="small"
                  >
                    {t("backToLogin")}
                    <Login />
                  </Button>
                </div>
                <div className="form-button-right">
                  <Button variant="contained" color="primary" type="submit">
                    {t("Register")}
                    <PersonAdd />
                  </Button>
                </div>
              </div>
            </form>
          )}
        />
      </Paper>
    </Container>
  );
};

export default Register;
