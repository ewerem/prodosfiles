import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import EmailVerificationSuccess from "./pages/auth/EmailVerificationSuccess";
import ForgotPass from "./pages/auth/ForgetPass";
import ResendConfirm from "./pages/auth/ResendConfirm";
import ResetPass from "./pages/auth/ResetPass";
import Dashboard from "./pages/dashboard/Dashboard";

import "react-toastify/dist/ReactToastify.css";
import FolderPage from "./pages/dashboard/Folder";
import FilesPage from "./pages/dashboard/Files";
import BinFolderPage from "./pages/dashboard/BinFolder";
import BinFilePage from "./pages/dashboard/BinFiles";
import StarFolderPage from "./pages/dashboard/StarFolder";
import StarFilePage from "./pages/dashboard/StarFile";

const theme = createTheme(); // Create a Material-UI theme

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {/* Default to Login page */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/email-verification-success"
            element={<EmailVerificationSuccess />}
          />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/resend-confirmation" element={<ResendConfirm />} />
          <Route path="/reset-password" element={<ResetPass />} />
 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/folder/:name" element={<FolderPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/bin-folder" element={<BinFolderPage />} />
          <Route path="/bin-file" element={<BinFilePage />} />
          <Route path="/star-folder" element={<StarFolderPage />} />
          <Route path="/star-file" element={<StarFilePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
