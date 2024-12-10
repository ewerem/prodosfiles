import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import personal from "../../assets/personal.png";

const Verify = () => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem("auth-token"); // Replace "auth-token" with your actual key

  // Check if token exists
  if (!token) {
    toast.error("Authentication token not found. Please log in again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  // Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!token) {
        toast.error("Unable to verify without a valid token.", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      try {
        const response = await VerifyAction(values, token); 
        toast.success(response.data.message || "Verification email sent successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to verify account. Please sign up first", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    },
  });

  return (
    <div className="lg:bg-gradient-to-b from-custom-light-blue via-custom-deep-blue to-custom-purple flex items-center justify-center">
      <div className="w-[90%] lg:w-[1027px] lg:bg-white rounded-lg p-6 lg:pl-[45px] lg:pr-[45px] lg:pt-[74px] lg:pb-[200px] lg:mt-[149px] lg:mb-[149px]">
        {/* Toastify container */}
        <ToastContainer />

        <p className="text-center text-[20px] pb-[18px] font-normal lg:hidden pt-[60px]">
          ProodosFiles
        </p>
        <h6 className="text-center text-[24px] pb-[148px] font-semibold lg:text-[32px] lg:font-extrabold">
          Verify Account
        </h6>
        <div className="lg:flex lg:justify-between lg:items-center">
          <div className="lg:w-1/2">
            <form onSubmit={formik.handleSubmit}>
              <p className="text-[14px] font-normal pb-[21px] lg:text-[16px]">
                Email
              </p>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-md border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-[#D0D5DD80]"
                } h-[44px] pl-4 text-[#24242480] mb-6`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mb-4">
                  {formik.errors.email}
                </p>
              )}
              <button
                type="submit"
                className="text-[16px] mb-[425px] lg:mb-[20px] font-bold w-full h-[44px] text-white bg-gradient-to-r from-custom-light-blue to-custom-purple rounded-md"
              >
                Verify account
              </button>
            </form>
          </div>
          <div>
            <img
              src={personal}
              alt="Personal Illustration"
              className="hidden lg:block max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
