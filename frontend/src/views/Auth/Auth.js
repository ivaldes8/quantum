import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";

import {
  composeValidators,
  email,
  required,
} from "../../core/custom-components/validations/InputErrors";
import TextField from "../../core/custom-components/form-elements/TextField";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Login from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";

const Auth = () => {
  const { t } = useTranslation();

  const submitForm = (data) => {
    console.log(data);
  };

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
          <LockOutlinedIcon />
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
                field="username"
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
                  <Button variant="contained" color="primary"  type="submit">
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
