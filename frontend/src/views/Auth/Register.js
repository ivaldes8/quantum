import { useEffect } from "react";
import { Form } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../core/redux/features/auth/authSlice";
import { getCurrencies } from "../../core/redux/features/currency/currencySlice";

import "./Auth.css";

import {
  Avatar,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { LockOutlined, Login, PersonAdd } from "@mui/icons-material";

import AddLine from "../../core/custom-components/AddLine";
import {
  composeValidators,
  email,
  required,
} from "../../core/custom-components/validations/InputErrors";
import TextField from "../../core/custom-components/form-elements/TextField";
import SimpleSelect from "../../core/custom-components/form-elements/SelectSimple/index";
import Loading from "../../core/custom-components/Loading";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { currencies } = useSelector((state) => state.currency);

  useEffect(() => {
    console.log('Here')
    dispatch(getCurrencies());
    console.log(currencies, 'JAAJ')
  }, []);

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
    return <Loading />
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
              <SimpleSelect style={{width: '95%'}}
                field="currency"
                label="currency"
                selectkey="name"
                simple={false}
                options={currencies}
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
      <AddLine />
    </Container>
  );
};

export default Register;
