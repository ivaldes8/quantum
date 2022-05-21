import React from "react";
import { Container, Box, Grid } from "@mui/material";
import CardComponent from "../card/card";

const CardList = ({ list, titleKey, descKey, onEditHandler, onDeleteHandler, onSelectHandler }) => {
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
                  element={item}
                  onEdit={onEditHandler}
                  onDelete={onDeleteHandler}
                  onSelect={onSelectHandler}
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
