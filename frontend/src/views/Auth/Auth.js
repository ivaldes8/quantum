import { useEffect } from "react";
import { Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../core/redux/features/auth/authSlice";

import {CircularProgress, Box, Avatar, Button, CssBaseline, Typography, Container, Paper}from "@mui/material";
import {LockOutlined, Login} from "@mui/icons-material";

import {
  composeValidators,
  email,
  required,
} from "../../core/custom-components/validations/InputErrors";
import TextField from "../../core/custom-components/form-elements/TextField";




const Auth = () => {
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
    dispatch(login(data));
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column",
      alignItems: "center", position: 'absolute', width: '100%'}}>
        <CircularProgress  style={{alignSelf: 'center', marginTop: '30%'}} size={150}/>
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
                  <Button variant="text" color="primary" size="small">
                    {t("Register")}
                    <Login />
                  </Button>
                </div>
                <div className="form-button-right">
                  <Button variant="contained" color="primary" type="submit">
                    {t("Login")}
                    <Login />
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

export default Auth;
