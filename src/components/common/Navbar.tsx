import React, { useState, useRef } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  AccountCircle,
  Logout,
  Folder,
  CreateNewFolder,
  RestoreFromTrash,
  FileOpen,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import apiWithToken from "../../utils/apiWithToken";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import apiForFilesUpload from "../../utils/apiForFilesUpload";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import StarIcon from "@mui/icons-material/Star";


interface NavbarProps {
  onLogout: () => void;
  user: { username: string; email: string };
}

const Navbar: React.FC<NavbarProps> = ({ onLogout, user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [breadcrumbMenuAnchor, setBreadcrumbMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleBreadcrumbClick = (event: React.MouseEvent<HTMLElement>) => {
    setBreadcrumbMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setBreadcrumbMenuAnchor(null);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFolderName("");
    setError("");
    setLoading(false);
  };

  const handleClickFolder = () => {
    navigate("/dashboard");
  };

  const handleClickFiles = () => {
    navigate("/files");
  };

  const handleClickBinFolders = () => {
    navigate("/bin-folder");
  };

  const handleClickBinFiles = () => {
    navigate("/bin-file");
  };

  const handleClickStar = () => {
    navigate("/star");
  };

  const handleUploadDialogOpen = () => {
    setDialogOpen(true);
    handleClose();
  };

  const handleUploadDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Show toast notifications based on success or error
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  //create a folder
  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      setError("Folder name is required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const data = JSON.stringify({
        folder_name: folderName.trim(),
      });

      const response = await apiWithToken.post("/create-f/", data);

      if (!response.data.responseText) {
        showToast("Failed to create folder. Please try again.", "error");
        throw new Error("Failed to create folder");
      } else {
        showToast(response.data.responseText, "success");
        // set the forms to empty and stop loader
        setFolderName("");
        setError("");
        setLoading(false);
      }
    } catch (error: any) {
      const responseText =
        error.response?.data?.folder_name?.[0] || "An error occurred !!";
      showToast(responseText, "error");
    } finally {
      setLoading(false);
    }
  };

  //upload file
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    //open dialog loader
    handleUploadDialogOpen();

    const files = event.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    console.log("files-upload -- ", formData);

    try {
      const response = await apiForFilesUpload.post("/upload_file/", formData);

      console.log("file-response -- ", response);

      if (response.status === 201) {
        handleUploadDialogClose();
        showToast("File uploaded successfully !!", "success");
      } else {
        handleUploadDialogClose();
        showToast("Failed to upload file. Please try again.", "error");
      }
    } catch (error) {
      handleUploadDialogClose();
      showToast("An error occurred !!", "error");
    }
  };

  return (
    <AppBar
      // position="sticky"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Breadcrumb or Title */}
        {isSmallScreen ? (
          <Box>
            <IconButton
              onClick={handleBreadcrumbClick}
              aria-controls="breadcrumb-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="breadcrumb-menu"
              anchorEl={breadcrumbMenuAnchor}
              open={Boolean(breadcrumbMenuAnchor)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDialogOpen}>
                <ListItemIcon>
                  <CreateNewFolder />
                </ListItemIcon>
                <ListItemText primary="New Folder" />
              </MenuItem>
              <MenuItem>
                <ListItem onClick={handleUploadClick}>
                  <ListItemIcon>
                    <UploadFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Upload Files" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </ListItem>
              </MenuItem>

              <MenuItem onClick={handleClickFolder}>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary="Folders" />
              </MenuItem>

              <MenuItem onClick={handleClickFiles}>
                <ListItemIcon>
                  <FileOpen />
                </ListItemIcon>
                <ListItemText primary="Files" />
              </MenuItem>

              <MenuItem onClick={handleClickStar}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Star" />
              </MenuItem>

              <MenuItem onClick={handleClickBinFolders}>
                <ListItemIcon>
                  <RestoreFromTrash />
                </ListItemIcon>
                <ListItemText primary="Binned Folder" />
              </MenuItem>

              <MenuItem onClick={handleClickBinFiles}>
                <ListItemIcon>
                  <DeleteOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Binned File" />
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{ flexGrow: 0, textAlign: "left", fontWeight: "bold" }}
          >
            ProdosFiles
          </Typography>
        )}

        {/* Profile and Logout */}
        <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleProfileClick}>
            <AccountCircle sx={{ color: "white" }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <Typography variant="subtitle1">{user.username}</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="subtitle2" color="textSecondary">
                {user.email}
              </Typography>
            </MenuItem>
          </Menu>
          <IconButton onClick={onLogout}>
            <Logout sx={{ color: "gold" }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Dialog for New Folder */}
      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Folder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="folder-name"
            label="Enter Folder Name"
            type="text"
            fullWidth
            variant="outlined"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            error={!!error}
            helperText={error}
            disabled={loading}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="secondary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateFolder}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add ToastContainer for toast notifications */}
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

      {/* Dialog popup for file loading */}
      <Dialog open={dialogOpen}>
        <DialogContent>
          <DialogContentText sx={{ color: "primary", fontSize: "27px" }}>
            <CircularProgress size={24} /> UPLOADING......
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
};

export default Navbar;
