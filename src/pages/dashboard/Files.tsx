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
import apiWithToken from "../../utils/apiWithToken";
// import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";

interface File {
  id: string;
  owner: string;
  name: string;
  upload_date: string;
  size: string;
}

const Files: React.FC = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [dialogBinOpen, setDialogBinOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStarOpen, setDialogStarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  // Show toast notifications based on success or error
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleStarDialogOpen = () => {
    setDialogStarOpen(true);
    handleMenuClose();
  };

  const handleStarDialogClose = () => {
    setDialogStarOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, file: File) => {
    setMenuAnchor(event.currentTarget);
    setSelectedFile(file);
  };

  //wit making setSelectedFolder = null
  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFile(null);
  };

  const handleRenameDialogOpen = () => {
    if (!selectedFile) {
      showToast("No folder selected to rename.", "error");
      return;
    }
    setRenameDialogOpen(true);
    setNewFileName(selectedFile.name || "");
    handleMenuCloseRenameFolder();
  };

  const handleRenameDialogClose = () => {
    setRenameDialogOpen(false);
    setNewFileName("");
  };

  const handleMenuCloseRenameFolder = () => {
    setMenuAnchor(null);
  };

  const user = {
    username: localStorage.getItem("username") ?? "",
    email: localStorage.getItem("email") ?? "",
  };

  const handleMoveBinDialogOpen = () => {
    setDialogBinOpen(true);
    handleMenuClose();
  };

  const handleMoveBinDialogClose = () => {
    setDialogBinOpen(false);
  };

  const handleDeleteDialogOpen = () => {
    setDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteDialogClose = () => {
    setDialogOpen(false);
  };

  //get all files
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const response = await apiWithToken.get("/user-files/");

      console.log("file-response", response);

      if (response.status === 200) {
        const data: File[] = response.data;
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

  //rename file name
  const handleRenameFile = async () => {
    if (!selectedFile) {
      showToast("No folder selected for renaming.", "error");
      handleRenameDialogClose(); // Ensure dialog closes even on error
      return;
    }

    if (!newFileName.trim()) {
      showToast("Please provide a valid folder name.", "error");
      return;
    }

    try {
      setLoading(true);
      const data = {
        file_id: selectedFile.id,
        new_name: newFileName.trim(),
        override: false,
      };

      const response = await apiWithToken.post("/fi/rename/", data);

      console.log(response);
      // return

      if (response.status === 200) {
        showToast(response.data.responseText, "success");
        fetchFiles();
      } else {
        showToast(response.data.responseText, "error");
      }
    } catch (error) {
      console.error("Error renaming folder:", error);
      showToast("An error occurred while renaming the file.", "error");
    } finally {
      setLoading(false);
      handleRenameDialogClose();
    }
  };

  //move file to bin
  const handleBinFile = async () => {
    handleMoveBinDialogOpen();
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
          fetchFiles();
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

  //delete a file
  const handleDeleteFile = async () => {
    handleDeleteDialogOpen();
    if (selectedFile) {
      try {
        const data = {
          file_id: selectedFile.id,
        };
        const jsonData = JSON.stringify(data);

        const response = await apiWithToken.post("/fi/del/", jsonData);

        console.log(response);

        if (response.status === 200) {
          showToast(response.data.responseText, "success");
          fetchFiles();
          handleDeleteDialogClose();
        } else {
          showToast(response.data.responseText, "error");
          handleDeleteDialogClose();
        }
      } catch (error: any) {
        const responseText = "An error occurred !!";
        showToast(responseText, "error");
        handleDeleteDialogClose();
      } finally {
        setLoading(false);
      }
    }
    handleMenuClose();
  };

  //start a file
  const handleStarFile = async () => {
    handleStarDialogOpen();
    if (selectedFile) {
      try {
        const data = {
          file_id: selectedFile.id,
        };
        const jsonData = JSON.stringify(data);

        const response = await apiWithToken.post("/fi/star/", jsonData);

        console.log(response);

        if (response.status === 200) {
          showToast(response.data.responseText, "success");
          fetchFiles();
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

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} user={user} refreshFolders={fetchFiles} />
      {!isSmallScreen && (
        <Sidebar onLogout={handleLogout} refreshFolders={fetchFiles} />
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
          Files
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
                  sx={{ fontSize: "11px", color: "purple" }}
                >
                  {file.size}
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
                  }).format(new Date(file.upload_date))}
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
              No files found
            </Typography>
          </Box>
        )}
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleRenameDialogOpen}>Rename</MenuItem>
          <MenuItem onClick={handleStarFile}>Star</MenuItem>
          <MenuItem onClick={handleBinFile}>Move to bin</MenuItem>
          <MenuItem onClick={handleDeleteFile}>Delete</MenuItem>
        </Menu>
      </Box>

      {/* Dialog popup for renaming file */}
      <Dialog
        open={renameDialogOpen}
        onClose={handleRenameDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Rename File</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Folder Name"
            fullWidth
            variant="outlined"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenameDialogClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleRenameFile}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : "Rename"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog popup for moving file to bin */}
      <Dialog open={dialogBinOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> MOVING TO BIN......
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Dialog popup for starring a file */}
      <Dialog open={dialogStarOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> PLEASE WAIT...
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* Dialog popup for deleting a folder */}
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "red", fontSize: "27px" }}>
            <CircularProgress size={24} sx={{ color: "red" }} /> DELETING......
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

export default Files;
