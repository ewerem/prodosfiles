import React, { useEffect, useState } from "react";
import {
  Divider,
  Box,
  CssBaseline,
  useMediaQuery,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import apiWithToken from "../../utils/apiWithToken";
// import { useNavigate } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface StarF {
    id: string;
  owner: string;
  name: string;
  size: string;
}

const StarFile: React.FC = () => {
  const theme = useTheme();
  // const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [files, setFiles] = useState<StarF[]>([]);
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
    username: localStorage.getItem("username") ?? "",
    email: localStorage.getItem("email") ?? "",
  };

  const fetchStarF = async () => {
    setLoading(true);
    try {
      const response = await apiWithToken.get("/starred-f/");

      console.log("file-response", response);

      if (response.status === 200) {
        const data: StarF[] = response.data.my_starred_files;
        setFiles(data);
      } else {
        console.error("Failed to fetch star files: ", response.statusText);
        setFiles([]);
      }
    } catch (error) {
      console.error("Error fetching star files:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStarF();
  }, []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Navbar onLogout={handleLogout} user={user} refreshFolders={fetchStarF}/>
      {!isSmallScreen && <Sidebar onLogout={handleLogout} refreshFolders={fetchStarF}/>}
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
          Starred Files
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
              No Star Files Found
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

export default StarFile;
