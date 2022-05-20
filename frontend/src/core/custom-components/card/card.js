import React from "react";
import { useTranslation } from "react-i18next";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
  Divider,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import cardImage from "./istockphoto-840202842-170667a.jpg";

const CardComponent = (props) => {
  const { t } = useTranslation();

  const { title, description, editable, deleteable, clickeable, element, onEdit, onDelete } = props;

  return (
    <Card sx={{ maxWidth: 250 }}>
      {clickeable ? (
        <>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={cardImage}
              alt="green iguana"
            />
            <CardContent>
              {title && (
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
              )}
              {description && (
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              )}
            </CardContent>
          </CardActionArea>
          {(editable || deleteable) && (
            <>
              <Divider />
              <CardActions >
                {editable && (
                  <Button size="small" onClick={() => onEdit(element)} sx={{ flexGrow: 1 }} color="primary">
                    {t("Edit")}
                    <Edit />
                  </Button>
                )}

                {deleteable && (
                  <Button size="small" onClick={() => onDelete(element)} sx={{ flexGrow: 1 }} color="error">
                    {t("Delete")}
                    <Delete />
                  </Button>
                )}
              </CardActions>
            </>
          )}
        </>
      ) : (
        <>
          <CardMedia
            component="img"
            height="140"
            image={cardImage}
            alt="green iguana"
          />
          <CardContent>
            {title && (
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </CardContent>
          {(editable || deleteable) && (
            <CardActions>
              {editable && (
                <Button size="small" onClick={() => onEdit(element)} color="primary">
                  {t("Edit")}
                  <Edit />
                </Button>
              )}

              {deleteable && (
                <Button size="small" onClick={() => onDelete(element)} color="danger">
                  {t("Delete")}
                  <Delete />
                </Button>
              )}
            </CardActions>
          )}
        </>
      )}
    </Card>
  );
};

export default CardComponent;
