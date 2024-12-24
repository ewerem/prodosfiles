
import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

export default Loader;
