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
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";

interface BinFolder {
  owner: string;
  name: string;
  created_at: string;
  id: string;
}

const BinFolder: React.FC = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [folders, setFolders] = useState<BinFolder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<BinFolder | null>(null);
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
    folder: BinFolder
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFolder(folder);
  };

  //with making setSelectedFolder = null
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFolder(null);
  };

  //fetch bin folders
  const fetchBinFolder = async () => {
    setLoading(true);
    try {
      const response = await apiWithToken.get("/binned-f/");

      console.log("file-response", response);

      if (response.status === 200) {
        const data: BinFolder[] = response.data.binned_folders;
        setFolders(data);
      } else {
        console.error("Failed to fetch folders: ", response.statusText);
        setFolders([]);
      }
    } catch (error) {
      console.error("Error fetching folders:", error);
      setFolders([]);
    } finally {
      setLoading(false);
    }
  };

  //restore folder
  const handleRestoreFolder = async () => {
    handleRestoreDialogOpen();
    if (selectedFolder) {
      try {
        const data = {
          folder_id: selectedFolder.id,
        };
        const jsonData = JSON.stringify(data);

        const response = await apiWithToken.post("/fo/bin/", jsonData);

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
          Binned Folders
        </Typography>
        <Divider />

        {loading ? (
          <CircularProgress />
        ) : folders.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {folders.map((folder) => (
              <Box
                key={folder.name}
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
                <FolderIcon fontSize="large" color="primary" />
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
                  {folder.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontSize: "10px" }}
                >
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(new Date(folder.created_at))}
                </Typography>

                <IconButton
                  onClick={(event) => handleMenuOpen(event, folder)}
                  sx={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : (
          <Box>
            <FolderIcon fontSize="large" color="disabled" />
            <Typography variant="h6" color="textSecondary">
              No Binned fiolders found
            </Typography>
          </Box>
        )}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleRestoreFolder}>Restore</MenuItem>
        </Menu>
      </Box>

      {/* Dialog popup for moving folder to bin */}
      <Dialog open={dialogBinOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> RESTORING FOLDER..
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

export default BinFolder;
