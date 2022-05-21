import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center"
      }}
    >
      <CircularProgress style={{ alignSelf: "center" }} size={150} />
    </Box>
  );
};

export default Loading;
