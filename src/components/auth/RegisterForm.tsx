import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { registerUser } from "../../services/authService";
import { AccountCircle, Person, Email, Lock } from "@mui/icons-material";

interface RegisterFormProps {
  showToast: (message: string, type: "success" | "error") => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  showToast,
  setLoading,
  setError,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      // Call the register API
      const response = await registerUser(formData);
      if (response.success) {
        setSuccess("Your registration was successful.");
        showToast("Your registration was successful.", "success");

        //set true after successful login
        localStorage.setItem("hasSignUp", "true");
        // Navigate to the login page after successful registration
        // navigate("/login");
      } else {
        setError(response.message);
        showToast(response.message, "error");
      }
    } catch (err: any) {
      setError("An error occurred !!.");
      showToast("An error occurred !!", "error");
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
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box marginBottom="1.5rem">
        <TextField
          fullWidth
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          variant="outlined"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />
      </Box>

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

      <Box marginBottom="1.5rem">
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={formData.password}
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
            "Register"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default RegisterForm;
