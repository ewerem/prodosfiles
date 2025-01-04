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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SourceIcon from "@mui/icons-material/Source";
import { ToastContainer } from "react-toastify";
import apiWithToken from "../../utils/apiWithToken";

interface Folder {
  owner: string;
  name: string;
  created_at: string;
  id: string;
  subfolders?: Folder[]; // Optional subfolders property
}

const FolderPage: React.FC = () => {
  const { state } = useLocation();
  const { name } = useParams<{ name: string }>(); // Use type for name param
  const folder = state?.folder;
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const handleNavigateLogout = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    handleNavigateLogout();
  };

  const user = {
    username: localStorage.getItem("username") ?? "",
    email: localStorage.getItem("email") ?? "",
  };

  const fetchFolders = async () => {
    setLoading(true);
    try {
      const response = await apiWithToken.get("/all-folders/");

      if (response.status === 200) {
        const data: Folder[] = response.data;

        // Find the folder with the specific name (or ID)
        const targetFolder = data.find((folder) => folder.name === name);

        if (targetFolder) {
          console.log("Subfolders:", targetFolder.subfolders || []);
          setFolders(targetFolder.subfolders || []); // Set subfolders or an empty array
        } else {
          console.log("Folder with the specified name not found.");
          setFolders([]); // Clear state if no folder is found
        }
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
  }, [name]);

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

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar
        onLogout={handleLogout}
        user={user}
        folderId={folder?.id}
        refreshFolders={fetchFolders}
      />
      {!isSmallScreen && (
        <Sidebar
          onLogout={handleLogout}
          folderId={folder?.id}
          refreshFolders={fetchFolders}
        />
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
          Folder: {name}
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
          <MenuItem onClick={() => console.log("Open Folder")}>Open</MenuItem>
          <MenuItem onClick={() => console.log("Rename Folder")}>
            Rename
          </MenuItem>
        </Menu>
      </Box>

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

export default FolderPage;
