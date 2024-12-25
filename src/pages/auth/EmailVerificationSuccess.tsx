import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import apiClient from "../../utils/apiClient";

const EmailVerificationSuccess: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const encodedUserId = params.get("u_info");

        if (!encodedUserId) {
          throw new Error("Invalid verification link.");
        }

        const decodedUserId = atob(encodedUserId);
        const userData = JSON.parse(decodedUserId.replace(/'/g, '"'));

        const token = userData?.token || null;
        const uidb64 = userData?.u_id || null;

        const response = await apiClient.post("/verify/", { token, uidb64 });

        // Debug the response to check if it's structured correctly
        // console.log(response);

        if (response.data?.responseText) {
          setSuccess(true);
        } else {
          throw new Error(response.data?.message || "Failed to verify email.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred during verification.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [location.search]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          marginTop: { xs: '-13rem', sm: '0' },
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: "2rem", borderRadius: "10px", textAlign: "center" }}
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <>
              <ErrorOutline
                sx={{ fontSize: "4rem", color: "red", marginBottom: "1rem" }}
              />
              <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
                Verification Failed
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
                {error}
              </Typography>
            </>
          ) : success ? (
            <>
              <CheckCircleOutline
                sx={{ fontSize: "4rem", color: "green", marginBottom: "1rem" }}
              />
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "green" }}
                gutterBottom
              >
                Email Verified Successfully!
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "2rem" }}>
                Thank you for verifying your email. You can now proceed to log
                in and access your account.
              </Typography>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
                size="large"
              >
                Go to Login
              </Button>
            </>
          ) : null}
        </Paper>
      </Box>
    </Container>
  );
};

export default EmailVerificationSuccess;
