import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { Email, Lock } from "@mui/icons-material";

interface LoginFormProps {
  showToast: (message: string, type: "success" | "error") => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  showToast,
  setLoading,
  setError,
  setSuccess,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      // Call the login API
      const response = await loginUser(formData);
      if (response.success) {
        setSuccess("Login successful!");
        showToast("Login successful!", "success");

        //hold base auth details
        localStorage.setItem("token", response.data?.token || "");
        localStorage.setItem("username", response.data?.username || "");
        localStorage.setItem("email", formData.email);

        navigate("/dashboard");
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
            "Login"
          )}
        </Button>
      </Box>
    </form>
  );
};

export default LoginForm;
