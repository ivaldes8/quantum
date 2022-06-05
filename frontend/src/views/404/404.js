import React from "react";
import AddLine from "../../core/custom-components/AddLine";
import { AttachMoney } from "@mui/icons-material"
import { Container, Paper, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3} style={{textAlign: 'center'}}>
            <Typography variant="h1">
                4
                <AttachMoney  sx={{ fontSize: 80 }}/>
                4
            </Typography>
        </Paper>
      </Container>
      <AddLine />
    </>
  );
};

export default NotFound;
