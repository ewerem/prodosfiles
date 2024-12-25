import apiClient from "../utils/apiClient";

interface RegisterUserData {
  username: string;
  full_name: string;
  email: string;
  password: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Function to register a user
export const registerUser = async (
  data: RegisterUserData
): Promise<ApiResponse<null>> => {
  try {
    console.log("Request data: ", data);
    const response = await apiClient.post("/sign-up/", data);

    // console.log("Response data: ", response.data);
    return {
      success: true,
      message: "Your registration was successful.",
      data: response.data,
    };
  } catch (error: any) {
    // console.error("Login error: ", error);
    // Extract responseText if available
    const responseText =
      error.response?.data?.responseText?.[0] || "An error occurred !!";

    return {
      success: false,
      message: responseText,
    };
  }
};

// Function to log in a user
interface LoginUserData {
  email: string;
  password: string;
}

export const loginUser = async (
  data: LoginUserData
): Promise<ApiResponse<{ token: string, username: string }>> => {
  try {
    console.log("Request data: ", data);
    const response = await apiClient.post("/login/", data);

    // console.log("Response data: ", response.data);
    return {
      success: true,
      message: "Login successful.",
      data: response.data,
    };
  } catch (error: any) {
    // console.error("Login error: ", error);
    // Extract responseText if available
    const responseText =
      error.response?.data?.responseText?.[0] || "An error occurred !!";

    return {
      success: false,
      message: responseText,
    };
  }
};

// Function Forget password
interface ForgetPassUserData {
  email: string;
}

export const ForgetPassUser = async (
  data: ForgetPassUserData
): Promise<ApiResponse<{ token: string }>> => {
  try {
    console.log("Request data: ", data);
    const response = await apiClient.post("/forgot-pass/", data);

    // console.log("Response data: ", response.data);
    return {
      success: true,
      message: "Successful",
      data: response.data,
    };
  } catch (error: any) {
    // console.error("Login error: ", error);
    // Extract responseText if available
    const responseText =
      error.response?.data?.responseText?.[0] || "An error occurred !!";

    return {
      success: false,
      message: responseText,
    };
  }
};

// Function reset password
interface ResetPassUserData {
  password1: string;
  password2: string;
  token: string;
  uidb64: string;
}

export const ResetPassUser = async (
  data: ResetPassUserData
): Promise<ApiResponse<{ token: string }>> => {
  try {
    console.log("Request data: ", data);
    const response = await apiClient.post("/rest-pswd/", data);

    // console.log("Response data: ", response.data);
    return {
      success: true,
      message: "Successful",
      data: response.data,
    };
  } catch (error: any) {
    // console.error("Login error: ", error);
    // Extract responseText if available
    const responseText =
      error.response?.data?.responseText?.[0] || "An error occurred !!";

    return {
      success: false,
      message: responseText,
    };
  }
};
