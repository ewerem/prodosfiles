import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const FolderPage: React.FC = () => {
  const { state } = useLocation();
  const { name } = useParams();
  const folder = state?.folder;

  return (
    <Box>
      <Typography variant="h4">Folder: {name}</Typography>
      {folder && <Typography>Owner: {folder.owner}</Typography>}
      {folder && <Typography>Created At: {folder.created_at}</Typography>}
    </Box>
  );
};

export default FolderPage;
