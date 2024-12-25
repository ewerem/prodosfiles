import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { ResetPassUser } from "../../services/authService";
import { useLocation } from "react-router-dom";
import { Lock } from "@mui/icons-material";

interface ResetPassFormProps {
  showToast: (message: string, type: "success" | "error") => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
}

const ResetPassForm: React.FC<ResetPassFormProps> = ({
  showToast,
  setLoading,
  setError,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
    token: "",
    uidb64: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const decodeAndSetData = () => {
      try {
        const params = new URLSearchParams(location.search);
        const encodedUserId = params.get("u_info");

        if (!encodedUserId) {
          throw new Error("Invalid reset password link.");
        }

        // Decode base64 and parse as JSON
        const decodedUserId = atob(encodedUserId);
        const userData = JSON.parse(decodedUserId.replace(/'/g, '"'));

        console.log(userData);

        setFormData((prev) => ({
          ...prev,
          token: userData?.token || "",
          uidb64: userData?.u_id || "",
        }));
      } catch (error) {
        setError("Failed to decode reset link.");
        showToast("Failed to decode reset link.", "error");
      }
    };

    decodeAndSetData();
  }, [location.search, setError, showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
        const response = await ResetPassUser(formData);
        if (response.success) {
          setSuccess("Password reset successful!");
          showToast("Password reset successful!", "success");
        //   navigate("/login");
        } else {
          setError(response.message);
          showToast(response.message, "error");
        }
    } catch (err: any) {
      setError("An error occurred during password reset.");
      showToast("An error occurred during password reset.", "error");
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box marginBottom="1.5rem">
        <TextField
          fullWidth
          label="New Password"
          name="password1"
          value={formData.password1}
          onChange={handleChange}
          type="password"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box marginBottom="1.5rem">
        <TextField
          fullWidth
          label="Confirm Password"
          name="password2"
          value={formData.password2}
          onChange={handleChange}
          type="password"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Hidden input fields for token and uidb64 */}
      <input type="hidden" name="token" value={formData.token} readOnly />
      <input type="hidden" name="uidb64" value={formData.uidb64} readOnly />

      <Box textAlign="center" marginBottom="1.5rem">
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CircularProgress size={24} color="primary" />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default ResetPassForm;
