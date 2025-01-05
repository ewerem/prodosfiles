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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import apiWithToken from "../../utils/apiWithToken";
import { useNavigate } from "react-router-dom";
import SourceIcon from "@mui/icons-material/Source";
import { ToastContainer, toast } from "react-toastify";

interface Folder {
  owner: string;
  name: string;
  created_at: string;
  id: string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStarOpen, setDialogStarOpen] = useState(false);
  const [dialogBinOpen, setDialogBinOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleNavigateLogout = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    handleNavigateLogout();
  };

  // Show toast notifications based on success or error
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleUploadDialogOpen = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleUploadDialogClose = () => {
    setDialogOpen(false);
  };

  const handleStarDialogOpen = () => {
    setDialogStarOpen(true);
    handleMenuClose();
  };

  const handleStarDialogClose = () => {
    setDialogStarOpen(false);
  };

  const handleMoveBinDialogOpen = () => {
    setDialogBinOpen(true);
    handleMenuClose();
  };

  const handleMoveBinDialogClose = () => {
    setDialogBinOpen(false);
  };

  const handleRenameDialogOpen = () => {
    if (!selectedFolder) {
      showToast("No folder selected to rename.", "error");
      return;
    }
    setRenameDialogOpen(true);
    setNewFolderName(selectedFolder.name || "");
    handleMenuCloseRenameFolder();
  };

  const handleRenameDialogClose = () => {
    setRenameDialogOpen(false);
    setNewFolderName("");
  };

  const user = {
    username: localStorage.getItem("username") ?? "",
    email: localStorage.getItem("email") ?? "",
  };

  //fetch all folder
  const fetchFolders = async () => {
    setLoading(true);
    try {
      const response = await apiWithToken.get("/all-folders/");
      if (response.status === 200) {
        const data: Folder[] = response.data;
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

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    folder: Folder
  ) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFolder(folder);
  };

  //with making setSelectedFolder = null
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFolder(null);
  };

  //without making setSelectedFolder = null
  const handleMenuCloseRenameFolder = () => {
    setMenuAnchor(null);
  };

  const handleOpenFolder = () => {
    if (selectedFolder) {
      navigate(`/folder/${selectedFolder.name}`, {
        state: { folder: selectedFolder },
      });
    }
    handleMenuClose();
  };

  //delete a folder
  const handleDeleteFolder = async () => {
    handleUploadDialogOpen();
    if (selectedFolder) {
      try {
        const data = {
          folder_id: selectedFolder.id,
        };
        const jsonData = JSON.stringify(data);

        const response = await apiWithToken.post("/fo/del/", jsonData);

        console.log(response);

        if (response.status === 200) {
          showToast(response.data.responseText, "success");
          fetchFolders();
          handleUploadDialogClose();
        } else {
          showToast(response.data.responseText, "error");
          handleUploadDialogClose();
        }
      } catch (error: any) {
        const responseText = "An error occurred !!";
        showToast(responseText, "error");
        handleUploadDialogClose();
      } finally {
        setLoading(false);
      }
    }
    handleMenuClose();
  };

  //rename folder name
  const handleRenameFolder = async () => {
    if (!selectedFolder) {
      showToast("No folder selected for renaming.", "error");
      handleRenameDialogClose(); // Ensure dialog closes even on error
      return;
    }

    if (!newFolderName.trim()) {
      showToast("Please provide a valid folder name.", "error");
      return;
    }

    try {
      setLoading(true);
      const data = {
        folder_id: selectedFolder.id,
        new_name: newFolderName.trim(),
        override: false,
      };

      const response = await apiWithToken.post("/fo/rename/", data);

      if (response.status === 200) {
        showToast(response.data.responseText, "success");
        fetchFolders();
      } else {
        showToast(response.data.responseText, "error");
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
      showToast("An error occurred while renaming the folder.", "error");
    } finally {
      setLoading(false);
      handleRenameDialogClose();
    }
  };

  //move folder to bin
  const handleBinFolder = async () => {
    handleMoveBinDialogOpen();
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
          fetchFolders();
          handleMoveBinDialogClose();
        } else {
          showToast(response.data.responseText, "error");
          handleMoveBinDialogClose();
        }
      } catch (error: any) {
        const responseText = "An error occurred !!";
        showToast(responseText, "error");
        handleMoveBinDialogClose();
      } finally {
        setLoading(false);
      }
    }
    handleMenuClose();
  };

  //star a folder
  const handleStarFolder = async () => {
    handleStarDialogOpen();
    if (selectedFolder) {
      try {
        const data = {
          folder_id: selectedFolder.id,
        };
        const jsonData = JSON.stringify(data);

        const response = await apiWithToken.post("/fo/star/", jsonData);

        console.log(response);

        if (response.status === 200) {
          showToast(response.data.responseText, "success");
          fetchFolders();
          handleStarDialogClose();
        } else {
          showToast(response.data.responseText, "error");
          handleStarDialogClose();
        }
      } catch (error: any) {
        const responseText = "An error occurred !!";
        showToast(responseText, "error");
        handleStarDialogClose();
      } finally {
        setLoading(false);
      }
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} user={user} refreshFolders={fetchFolders} />
      {!isSmallScreen && <Sidebar onLogout={handleLogout} refreshFolders={fetchFolders} />}
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
          Folders
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
                key={folder.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  width: "120px",
                  position: "relative",
                }}
              >
                <FolderIcon fontSize="large" color="primary" />
                <Typography
                  variant="subtitle1"
                  align="center"
                  sx={{ fontSize: "12px", fontWeight: "bold" }}
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
            <SourceIcon fontSize="large" color="disabled" />
            <Typography variant="h6" color="textSecondary">
              No folders found
            </Typography>
          </Box>
        )}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleOpenFolder}>Open</MenuItem>
          <MenuItem onClick={handleRenameDialogOpen}>Rename</MenuItem>
          <MenuItem onClick={handleStarFolder}>Star</MenuItem>
          <MenuItem onClick={handleBinFolder}>Move to bin</MenuItem>
          <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
        </Menu>
      </Box>

      {/* Dialog popup for deleting a folder */}
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "red", fontSize: "27px" }}>
            <CircularProgress size={24} sx={{ color: "red" }} /> DELETING......
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Dialog popup for moving folder to bin */}
      <Dialog open={dialogBinOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> MOVING TO BIN......
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Dialog popup for starring a folder */}
      <Dialog open={dialogStarOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> PLEASE WAIT...
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Dialog popup for renaming folder */}
      <Dialog
        open={renameDialogOpen}
        onClose={handleRenameDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rename Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Folder Name"
            fullWidth
            variant="outlined"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleRenameFolder}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Rename"}
          </Button>
        </DialogActions>
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

export default Dashboard;
