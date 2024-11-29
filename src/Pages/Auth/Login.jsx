import { useNavigate } from "react-router-dom"; // Import the hook
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { SignupAction, LoginAction } from "../../Base/auth";
import Clouds from "../../assets/Clouds.png";

  const Login = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
      username: "",
      full_name: "",
      email: "",
      password: "",
    });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showSignupPrompt, setShowSignupPrompt] = useState(false);

  const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const signupSchema = Yup.object({
    username: Yup.string()
      .min(2, "Username is too short!")
      .max(50, "Username is too long!")
      .required("Username is required"),
    full_name: Yup.string()
      .min(2, "Full name is too short!")
      .max(50, "Full name is too long!")
      .required("Full name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[@$!%*?&]/, "Password must contain at least one special character"),
  });

  const currentSchema = isLogin ? loginSchema : signupSchema;

  // LocalStorage safeguard for signup prompt
  useEffect(() => {
    try {
      const hasSignedUp = localStorage.getItem("hasSignedUp");
      if (!hasSignedUp) {
        setShowSignupPrompt(true);
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err);
    }
  }, []);

  const handleClosePopup = () => {
    try {
      setShowSignupPrompt(false);
    } catch (err) {
      console.error("Error closing popup:", err);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    try {
      await currentSchema.validateAt(name, { [name]: value });
      setErrors((prev) => ({ ...prev, [name]: "" }));
      setIsValid((prev) => ({ ...prev, [name]: true }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
      setIsValid((prev) => ({ ...prev, [name]: false }));
    }
  };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        await currentSchema.validate(formData, { abortEarly: false });
        setErrors({});
        const action = isLogin ? LoginAction : SignupAction;
        const response = await action(formData);
  
        localStorage.setItem("hasSignedUp", "true");
  
        if (response.status >= 200 && response.status < 300) {
          toast.success(isLogin ? "Login successful" : "Signup successful");
          if (isLogin) {
            // Redirect to the dashboard after successful login
            navigate("/dashboard"); // Ensure "/dashboard" is the correct path
          } else {
            setPopupMessage("Check your email address for verification.");
          }
        } else {
          toast.error("Unexpected response. Please try again.");
        }
      } catch (err) {
        if (err.name === "ValidationError") {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path || "unknown"] = error.message;
          });
          setErrors(validationErrors);
        } else if (err.response) {
          console.error("API Error:", err.response.data);
          toast.error(err.response.data.message || "Something went wrong!");
        } else {
          console.error("Unexpected Error:", err);
          toast.error("An unexpected error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

  return (
    <ErrorBoundary>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center min-h-screen">
        <ToastContainer />
        {popupMessage && (
          <div className="popup">
            <p>{popupMessage}</p>
            <button onClick={() => setPopupMessage("")} className="popup-close">
              Close
            </button>
          </div>
        )}
        {showSignupPrompt && (
          <div className="popup">
            <p>Welcome! Please sign up before you log in.</p>
            <button onClick={handleClosePopup} className="popup-close">
              Got it!
            </button>
          </div>
        )}
        <div className="bg-gradient-to-t from-[#773DD3] to-[#40B7D1] lg:flex items-center justify-center lg:w-1/2 p-4 lg:p-8 text-white min-h-screen">
          <div className="bg-white w-full max-w-lg p-6 md:p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between mb-6">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setFormData({ ...formData, username: "", full_name: "" });
                  setErrors({});
                }}
                className={`w-1/2 py-2 text-sm md:text-base font-bold rounded-l-lg ${
                  isLogin ? "bg-[#C83AA7] text-white" : "bg-white text-[#242424]"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setErrors({});
                }}
                className={`w-1/2 py-2 text-sm md:text-base font-bold rounded-r-lg ${
                  isLogin ? "bg-white text-[#242424]" : "bg-[#C83AA7] text-white"
                }`}
              >
                Sign Up
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
                {isLogin ? "Login" : "Sign Up"}
              </h3>
              {!isLogin && (
                <>
                  <InputField
                    label="Username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    error={errors.username}
                    isValid={isValid.username}
                  />
                  <InputField
                    label="Full Name"
                    name="full_name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    error={errors.full_name}
                    isValid={isValid.full_name}
                  />
                </>
              )}
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                isValid={isValid.email}
              />
              <InputField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="************"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                isValid={isValid.password}
                togglePasswordVisibility={setShowPassword}
                showPassword={showPassword}
              />
              <button
                type="submit"
                className="bg-gradient-to-t from-[#773DD3] to-[#40B7D1] w-full py-2 rounded-lg text-white font-bold mt-4 text-sm md:text-base"
                disabled={loading}
              >
                {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2 hidden lg:block relative bg-gray-100">
          <img src={Clouds} alt="Clouds" className="w-full h-full object-cover" />
        </div>
        <style>
          {`
            .popup {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
              z-index: 1000;
              text-align: center;
            }
            .popup-close {
              margin-top: 10px;
              background-color: #dc3545;
              color: white;
              padding: 5px 10px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
            }
          `}
        </style>
      </div>
    </ErrorBoundary>
  );
};

// ErrorBoundary component to handle UI failures gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  isValid,
  togglePasswordVisibility,
  showPassword,
}) => (
  <div className="mb-4">
    <label className="block font-medium mb-2 text-sm md:text-base">{label}:</label>
    <div className="relative">
      <input
        className={`w-full px-4 py-2 text-sm md:text-base rounded border text-gray-900 bg-white ${
          error ? "border-red-500" : isValid ? "border-green-500" : "border-gray-300"
        }`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {name === "password" && (
        <span
          onClick={() => togglePasswordVisibility(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-sm md:text-base"
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-xs md:text-sm mt-1">{error}</p>}
  </div>
);

export default Login;
