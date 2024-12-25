import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";
import { Info } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify for toasts

const Login: React.FC = () => {
  const setLoading = React.useState(false)[1];
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  //onload popup
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    // Check if `hasSignUp` is set in localStorage
    if (!localStorage.getItem("hasSignUp")) {
      setShowPopup(true);
    }
  }, []);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // Show toast notifications based on success or error
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Popup Dialog */}
      <Dialog open={showPopup} onClose={handlePopupClose}>
        <DialogTitle>Welcome to ProdosFiles</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Before logging in, ensure you have registered an account. If you
            haven't, please{" "}
            <a
              href="/register"
              style={{
                color: "#004ba0",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              click here
            </a>{" "}
            to register.
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
           <Button onClick={handlePopupClose} color="primary" autoFocus>
             I Understand
           </Button>
         </DialogActions> */}
      </Dialog>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper
          elevation={3}
          sx={{ padding: "2rem", borderRadius: "10px", width: "100%" }}
        >
          <Box textAlign="center" marginBottom="1.5rem">
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold" }}
              marginBottom="1.5rem"
            >
              Login
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Info sx={{ color: "#ff9800" }} />
              <Typography variant="body1" sx={{ color: "#000000" }}>
                Please enter your login credentials.
              </Typography>
            </Stack>
          </Box>

          {/* Pass the necessary props to the LoginForm */}
          <LoginForm
            showToast={showToast}
            setLoading={setLoading}
            setError={setError}
            setSuccess={setSuccess}
          />

          {error && (
            <Typography color="error" textAlign="center" mt={2}>
              {error}
            </Typography>
          )}

          {success && (
            <Typography color="primary" textAlign="center" mt={2}>
              {success}
            </Typography>
          )}

          <Typography variant="body1" textAlign="center" marginTop="1.5rem">
            Don't have an account?{" "}
            <a
              href="/register"
              style={{
                color: "#004ba0",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register here
            </a>
          </Typography>

          <Typography variant="body2" textAlign="center" marginTop="1.5rem">
            Forgot your password?{" "}
            <a
              href="/forgot-password"
              style={{
                color: "red",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Click here
            </a>
          </Typography>
        </Paper>
      </Box>

      {/* Add ToastContainer for toast notifications */}
      <ToastContainer />
    </Container>
  );
};

export default Login;
