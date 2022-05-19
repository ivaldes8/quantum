import React from "react";
import { Container, Box, Paper, Grid } from "@mui/material";
import CardComponent from "../card/card";

const CardList = ({ list, titleKey, descKey }) => {
  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {list.map((item) => (
              <Grid
                key={item._id}
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                display="flex"
                justifyContent="center"
                marginBottom={2}
                marginTop={2}
              >
                <CardComponent
                  title={item[`${titleKey}`]}
                  description={item[`${descKey}`]}
                  clickeable
                  deleteable
                  editable
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default CardList;
