import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import RegisterForm from "../../components/auth/RegisterForm";
import { Info } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import { useNavigate } from "react-router-dom";


const Register: React.FC = () => {
  // State to manage loading, error, success messages, and dialog visibility
  const setLoading = React.useState(false)[1];
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  // Function to show toast notifications
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message); // Success toast
    } else {
      toast.error(message); // Error toast
    }
  };

  // Function to handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  // Handle success state to show dialog
  React.useEffect(() => {
    if (success) {
      setDialogOpen(true); // Open dialog on success
    }
  }, [success]);

  return (
    <Container maxWidth="sm">
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
              Register
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Info sx={{ color: "#ff9800" }} />
              <Typography variant="body1" sx={{ color: "#000000" }}>
                Please, all fields are required.
              </Typography>
            </Stack>
          </Box>

          {/* Pass showToast and other props to RegisterForm */}
          <RegisterForm
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

          <Typography variant="body2" textAlign="center" marginTop="1.5rem">
            <span
              onClick={handleNavigateLogin}
              style={{
                color: "#004ba0",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login here
            </span>{" "}
            if you have registered before.
          </Typography>
        </Paper>
      </Box>

      {/* Dialog popup for registration success */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: "green", fontWeight: "bold" }}>
          Registration Successful
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            Registration successful. Please check your email to verify your
            account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="success">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* ToastContainer for toast notifications */}
      <ToastContainer />
    </Container>
  );
};

export default Register;
