import React, { useState, useRef, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  CreateNewFolder,
  Folder,
  RestoreFromTrash,
  Logout,
  FileOpen,
  Add,
} from "@mui/icons-material";
import apiWithToken from "../../utils/apiWithToken";
import { ToastContainer, toast } from "react-toastify";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import apiForFilesUpload from "../../utils/apiForFilesUpload";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";

interface SidebarProps {
  refreshFolders: () => void;
  onLogout: () => void;
  folderId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  refreshFolders,
  onLogout,
  folderId,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleNewClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  const handleClickStarFile = () => {
    navigate("/star-file");
  };

  const handleClickStarFolder = () => {
    navigate("/star-folder");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setFolderName("");
    setError("");
    setLoading(false);
  };

  const handleUploadDialogOpen = () => {
    setDialogOpen(true);
    handleMenuClose();
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

  //create folder
  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      setError("Folder name is required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const data = folderId
        ? JSON.stringify({
            folder_name: folderName.trim(),
            parent_folder_id: folderId,
          })
        : JSON.stringify({
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
        refreshFolders(); //refresh the folders
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

  useEffect(() => {
    if (folderId) {
      console.log("Current Folder ID in Sidebar:", folderId);
      // Do something with the folder ID
    }
  }, [folderId]);

  return (
    <Drawer variant="permanent" anchor="left">
      <Box sx={{ width: 250, padding: "1rem", marginTop: "4rem" }}>
        {/* Dropdown Button */}
        <Button
          size="large"
          variant="contained"
          startIcon={<Add />}
          onClick={handleNewClick}
          fullWidth
          sx={{ marginBottom: "1rem", borderRadius: "50px" }}
        >
          New
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleDialogOpen}>
            <ListItemIcon>
              <CreateNewFolder />
            </ListItemIcon>
            <ListItemText primary="New Folder" />
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
            }}
          >
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
        </Menu>

        <Divider />
        <List>
          <ListItem onClick={handleClickFolder}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText primary="Folders" />
          </ListItem>

          <ListItem onClick={handleClickFiles}>
            <ListItemIcon>
              <FileOpen />
            </ListItemIcon>
            <ListItemText primary="Files" />
          </ListItem>

          <ListItem onClick={handleClickStarFile}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Star Files" />
          </ListItem>

          <ListItem onClick={handleClickStarFolder}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Star Folders" />
          </ListItem>

          <ListItem onClick={handleClickBinFolders}>
            <ListItemIcon>
              <RestoreFromTrash />
            </ListItemIcon>
            <ListItemText primary="Binned Folder" />
          </ListItem>

          <ListItem onClick={handleClickBinFiles}>
            <ListItemIcon>
              <DeleteOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Binned File" />
          </ListItem>

          <ListItem onClick={onLogout}>
            <ListItemIcon>
              <Logout sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "red" }} />
          </ListItem>
        </List>
      </Box>

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
    </Drawer>
  );
};

export default Sidebar;
