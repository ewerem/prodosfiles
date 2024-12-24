import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { ForgetPassUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Email, Lock } from "@mui/icons-material";

interface ForgetPassFormProps {
  showToast: (message: string, type: "success" | "error") => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
}

const ForgetPassForm: React.FC<ForgetPassFormProps> = ({
  showToast,
  setLoading,
  setError,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission and API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Call the forgetPassword API
      const response = await ForgetPassUser(formData);
      if (response.success) {
        setSuccess("successful!");
        showToast("Successful Operation!", "success");
      } else {
        setError(response.message);
        showToast(response.message, "error");
      }
    } catch (err: any) {
      setError("An error occurred !!.");
      showToast("An error occurred !!.", "error");
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
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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

export default ForgetPassForm;
