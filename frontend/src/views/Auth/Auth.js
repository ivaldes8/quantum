import { useEffect } from "react";
import { Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../core/redux/features/auth/authSlice";

import './Auth.css';

import AddLine from "../../core/custom-components/AddLine";
import { Avatar, Button, Typography, Container, Paper }from "@mui/material";
import {LockOutlined, Login, PersonAdd} from "@mui/icons-material";

import {
  composeValidators,
  email,
  required,
} from "../../core/custom-components/validations/InputErrors";
import TextField from "../../core/custom-components/form-elements/TextField";
import Loading from "../../core/custom-components/Loading";




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
      <Loading/>
    );
  }

  return (
    <Container className="spacer layer" component="main" maxWidth="xs">
       <AddLine />
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: 'rgba(252, 252, 252, 0.4)'
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
                  <Button variant="text" component={Link} to='/register' color="primary" size="small">
                    <p style={{fontSize: '70%', fontWeight: 'bold'}}>{t("dontHaveAccount")}</p>
                    <PersonAdd />
                  </Button>
                </div>
                <div className="form-button-right">
                  <Button variant="contained" style={{height: 50}} color="primary" type="submit">
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
