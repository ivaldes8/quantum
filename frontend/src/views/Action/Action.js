import React from "react";
import { useParams } from "react-router-dom";

import Header from "../../core/custom-components/Header";
import AddLine from "../../core/custom-components/AddLine";
import { Container, Paper } from "@mui/material";

const Action = () => {

  const { name } = useParams()

  const handleCreateAction = () => {
    console.log('lol')
  }

  return (
    <>
      <AddLine />
      <Container>
        <Paper elevation={3}>
          <Header title="actionsOf" valueTitle={name} onClickHandler={handleCreateAction} />
        
        </Paper>
      </Container>
      <AddLine />
    </>
  );
};

export default Action;
