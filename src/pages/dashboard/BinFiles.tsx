import React, { useEffect, useState } from "react";
import {
  Divider,
  Box,
  CssBaseline,
  useMediaQuery,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import apiWithToken from "../../utils/apiWithToken";
// import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";

interface BinFiles {
  id: string;
  owner: string;
  name: string;
  size: string;
}

const BinFiles: React.FC = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [files, setFiles] = useState<BinFiles[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<BinFiles | null>(null);
  const [dialogBinOpen, setDialogBinOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const user = {
    username: localStorage.getItem("username") ?? "",
    email: localStorage.getItem("email") ?? "",
  };

  // Show toast notifications based on success or error
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleRestoreDialogOpen = () => {
    setDialogBinOpen(true);
    handleMenuClose();
  };

  const handleRestoreDialogClose = () => {
    setDialogBinOpen(false);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    file: BinFiles
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFile(file);
  };

  //with making setSelectedFolder = null
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFile(null);
  };

  //fetch all files
  const fetchBinFolder = async () => {
    setLoading(true);
    try {
      const response = await apiWithToken.get("/binned-f/");

      console.log("file-response", response);

      if (response.status === 200) {
        const data: BinFiles[] = response.data.binned_files;
        setFiles(data);
      } else {
        console.error("Failed to fetch folders: ", response.statusText);
        setFiles([]);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  //restore file
  const handleRestoreFile = async () => {
    handleRestoreDialogOpen();
    if (selectedFile) {
      try {
        const data = {
          file_id: selectedFile.id,
        };
        const jsonData = JSON.stringify(data);

        const response = await apiWithToken.post("/fi/bin/", jsonData);

        console.log(response);

        if (response.status === 200) {
          showToast(response.data.responseText, "success");
          fetchBinFolder();
          handleRestoreDialogClose();
        } else {
          showToast(response.data.responseText, "error");
          handleRestoreDialogClose();
        }
      } catch (error: any) {
        const responseText = "An error occurred !!";
        showToast(responseText, "error");
        handleRestoreDialogClose();
      } finally {
        setLoading(false);
      }
    }
    handleMenuClose();
  };

  useEffect(() => {
    fetchBinFolder();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar
        onLogout={handleLogout}
        user={user}
        refreshFolders={fetchBinFolder}
      />
      {!isSmallScreen && (
        <Sidebar onLogout={handleLogout} refreshFolders={fetchBinFolder} />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: !isSmallScreen ? "240px" : "0px",
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          align="center"
          sx={{
            fontSize: "20px",
            textAlign: "left",
          }}
        >
          Binned Files
        </Typography>
        <Divider />

        {loading ? (
          <CircularProgress />
        ) : files.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {files.map((file) => (
              <Box
                key={file.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  width: "120px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <InsertDriveFileIcon fontSize="large" color="primary" />
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    overflow: "hidden",
                    textAlign: "center",
                  }}
                >
                  {file.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontSize: "10px" }}
                >
                  {file.size}
                </Typography>

                <IconButton
                  onClick={(event) => handleMenuOpen(event, file)}
                  sx={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            <InsertDriveFileIcon fontSize="large" color="disabled" />
            <Typography variant="h6" color="textSecondary">
              No Binned files found
            </Typography>
          </Box>
        )}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleRestoreFile}>Restore</MenuItem>
        </Menu>
      </Box>

      {/* Dialog popup for moving folder to bin */}
      <Dialog open={dialogBinOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> RESTORING FILE..
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "60px" }}
      />
    </Box>
  );
};

export default BinFiles;
