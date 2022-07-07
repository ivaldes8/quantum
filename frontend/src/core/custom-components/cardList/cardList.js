import React from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import CardComponent from "../card/card";

const CardList = ({ list, titleKey, descKey, currency, onEditHandler, onDeleteHandler, onSelectHandler, noDataText = "noData", clickeable = true, deleteable = true, editable = true, defaultImage2 = false }) => {

  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          {
            list && list.length > 0 ? (
              <Grid container spacing={2}>
                {list.map((item) => (
                  <Grid
                    key={item._id}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    align="center"
                    marginBottom={2}
                    marginTop={2}
                  >
                    <CardComponent
                      element={item}
                      onEdit={onEditHandler}
                      onDelete={onDeleteHandler}
                      onSelect={onSelectHandler}
                      img={item.img}
                      defaultImage2={defaultImage2}
                      title={item[`${titleKey}`]}
                      description={item[`${descKey}`]}
                      currency={currency}
                      clickeable={clickeable}
                      deleteable={deleteable}
                      editable={editable}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  marginBottom={2}
                  marginTop={2}
                >
                  <Typography variant="h6" color="GrayText">{t(noDataText)}</Typography>
                </Grid>
              </Grid>
            )
          }
        </Box>
      </Container>
    </>
  );
};

export default CardList;
