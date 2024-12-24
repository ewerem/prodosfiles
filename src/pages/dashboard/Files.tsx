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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import apiWithToken from "../../utils/apiWithToken";
import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface File {
  owner: string;
  name: string;
  upload_date: string;
  size: string;
}

const Files: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
//   const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
//   const [selectedFolder, setSelectedFolder] = useState<File | null>(null);

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

  useEffect(() => {
    fetchFiles();
  }, []);

//   const handleMenuOpen = (
//     event: React.MouseEvent<HTMLElement>,
//     folder: File
//   ) => {
//     setMenuAnchor(event.currentTarget);
//     setSelectedFolder(folder);
//   };

//   const handleMenuClose = () => {
//     setMenuAnchor(null);
//     setSelectedFolder(null);
//   };

//   const handleOpenFolder = () => {
//     if (selectedFolder) {
//       navigate(`/folder/${selectedFolder.name}`, {
//         state: { folder: selectedFolder },
//       });
//     }
//     handleMenuClose();
//   };

//   const handleDeleteFolder = async () => {
//     if (selectedFolder) {
//       try {
//         await apiWithToken.delete(`/delete-folder/${selectedFolder.name}/`);
//         fetchFolders();
//       } catch (error) {
//         console.error("Error deleting folder:", error);
//       }
//     }
//     handleMenuClose();
//   };

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
                key={file.name}
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

                {/* <IconButton
                  onClick={(event) => handleMenuOpen(event, folder)}
                  sx={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  <MoreVertIcon />
                </IconButton> */}
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
        {/* <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleOpenFolder}>Open</MenuItem>
          <MenuItem onClick={handleDeleteFolder}>Delete</MenuItem>
        </Menu> */}
      </Box>
    </Box>
  );
};

export default Files;
