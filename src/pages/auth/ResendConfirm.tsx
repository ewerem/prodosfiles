import React, { useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ResendConfirmForm from "../../components/auth/ResendConfirmForm";
import { Info } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResendConfirm: React.FC = () => {
  const setLoading = React.useState(false)[1];
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  // Show toast notifications based on success or error
  const showToast = (message: string, type: "success" | "error") => {
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
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
        sx={{
          marginTop: { xs: "-13rem", sm: "0" },
        }}
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
              Resend Confirmation Link
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Info sx={{ color: "#ff9800" }} />
              <Typography variant="body1" sx={{ color: "#000000" }}>
                Please enter your email address.
              </Typography>
            </Stack>
          </Box>

          {/* Pass the necessary props to the ForgetForm */}
          <ResendConfirmForm
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
            Go back to{" "}
            <span
              onClick={handleNavigateLogin}
              style={{
                color: "#004ba0",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </span>
          </Typography>
        </Paper>
      </Box>

      {/* Dialog popup for registration success */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ color: "green", fontWeight: "bold" }}>
          Successful Operation
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "black" }}>
            A Confirmation link has been sent to your mail. Thanks.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="success">
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add ToastContainer for toast notifications */}
      <ToastContainer />
    </Container>
  );
};

export default ResendConfirm;
