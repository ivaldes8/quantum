import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({w="100%", h="100%", z=150}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        width: w,
        height: h,
        justifyContent: "center"
      }}
    >
      <CircularProgress style={{ alignSelf: "center" }} size={z} />
    </Box>
  );
};

export default Loading;
