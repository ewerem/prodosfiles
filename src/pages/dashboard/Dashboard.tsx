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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import apiWithToken from "../../utils/apiWithToken";
import { useNavigate } from "react-router-dom";
import SourceIcon from "@mui/icons-material/Source";

interface Folder {
  owner: string;
  name: string;
  created_at: string;
  id:string;
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  const user = {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
  };

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

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedFolder(null);
  };

  const handleOpenFolder = () => {
    if (selectedFolder) {
      navigate(`/folder/${selectedFolder.name}`, {
        state: { folder: selectedFolder },
      });
    }
    handleMenuClose();
  };

  const handleDeleteFolder = async () => {
    if (selectedFolder) {
    //   try {
    //     await apiWithToken.delete(`/delete-folder/${selectedFolder.name}/`);
    //     fetchFolders();
    //   } catch (error) {
    //     console.error("Error deleting folder:", error);
    //   }

    //   try {
    //     const data = ${selectedFolder.id};

    //     console.log("folder-id -- ", data)
    //     return
  
    //     const response = await apiWithToken.post("/create-f/", data);
  
    //     if (!response.data.responseText) {
    //       showToast("Failed to create folder. Please try again.", "error");
    //       throw new Error("Failed to create folder");
    //     } else {
    //       showToast(response.data.responseText, "success");
    //       // set the forms to empty and stop loader
    //       setFolderName("");
    //       setError("");
    //       setLoading(false);
    //     }
    //   } catch (error: any) {
    //     const responseText =
    //       error.response?.data?.folder_name?.[0] || "An error occurred !!";
    //     showToast(responseText, "error");
    //   } finally {
    //     setLoading(false);
    //   }

    }
    handleMenuClose();
  };


  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} user={user} />
      {!isSmallScreen && <Sidebar onLogout={handleLogout} />}
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
          <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Dashboard;
