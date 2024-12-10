import React,{useState} from "react";
import Apikit from '../../Base/Apikit';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import mark from "../../assets/mark.png";

import menuvector from "../../assets/menuvector.png";
import Home from "../../assets/Home.png";
import { Link } from "react-router-dom";
import FTP from "../../assets/FTP.png";
import Rating from "../../assets/Rating.png";
import Disposal from "../../assets/Disposal.png";
import AddFolder from "../../assets/AddFolder.png";
import LogoutRounded from "../../assets/LogoutRounded.png";
import close from "../../assets/close.png";
import { ForgotPasswordAction } from "../../Base/auth";



const ResetPassword = () => {

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values) => {
    try {
          const response = await ForgotPasswordAction(values,token)

      if (response.status === 200) {
        toast.success("Reset link sent successfully!");
      } else {
        toast.error("Failed to send the reset link. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="lg:bg-gradient-to-b from-custom-light-blue via-custom-deep-blue to-custom-purple flex items-center justify-center">
      {/* Toastify container */}
      <ToastContainer />

      

      {isMenuOpen ? (
        <div>
          <div
            className="bg-[#344054B2] opacity-70 w-[100%] h-full fixed top-0 left-0 lg:hidden"
            onClick={toggleMenu}
          ></div>
          <div className="bg-[#fff] w-[272px] h-[100%] fixed left-0 top-0 z-50 lg:hidden">
            <div className="flex justify-between items-center ">
              <p className=" mt-[22px] font-[Poppins] text-[#773DD3] text-base font-extrabold ml-[22px]">
                Prodoos<span className="font-light">Files</span>
              </p>
              <img
                className="mt-[28px] mr-[20px]"
                src={close}
                alt=""
                onClick={toggleMenu}
              />
            </div>

            <div className="flex ml-[16px] mt-[27px] hover:bg-[#E3E0E833] transition-colors duration-200 ">
              <img
                className="object-contain cursor-pointer"
                src={Home}
                alt=""
              />
              <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                Dashboard
              </h3>
            </div>

            <Link to="/folders">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={FTP}
                  alt=""
                />
                <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-base font-normal">
                  Folders
                </h3>
              </div>
            </Link>

            <Link to="/starred">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={Rating}
                  alt=""
                />
                <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                  Starred
                </h3>
              </div>
            </Link>

            <Link to="/recyclebin">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={Disposal}
                  alt=""
                />
                <h3 className="text-[#242424] cursor-pointer font-[Poppins] text-base font-normal">
                  Recycle Bin
                </h3>
              </div>
            </Link>

            <Link to="/create">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={AddFolder}
                  alt=""
                />
                <h3 className="text-[#242424]  cursor-pointer font-[Poppins] text-base font-normal">
                  Create
                </h3>
              </div>
            </Link>

            <Link to="/logout">
              <div className="flex ml-[16px] mt-[25px]">
                <img
                  className="object-contain cursor-pointer"
                  src={LogoutRounded}
                  alt=""
                />
                <h3 className="text-[#242424] font-[Poppins] text-base font-normal cursor-pointer">
                  Logout
                </h3>
              </div>
            </Link>
          </div>
        </div>
      ) : null}


      <div className="w-[90%] lg:w-[1027px] lg:bg-white rounded-lg p-6 lg:pl-[45px] lg:pr-[45px] lg:pt-[74px] lg:pb-[200px] lg:mt-[149px] lg:mb-[149px]">
        <p className="text-center text-[20px] pb-[18px] font-normal lg:hidden pt-[60px]">
          ProodosFiles
        </p>
        <h6 className="text-center text-[24px] pb-[148px] font-semibold lg:text-[32px] lg:font-extrabold">
          Forget Password
        </h6>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="lg:flex lg:justify-between lg:items-center">
              <div className="lg:w-1/2">
                <p className="text-[14px] font-normal pb-[21px] lg:text-[16px]">
                  Email
                </p>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-md border border-[#D0D5DD80] h-[44px] pl-4 text-[#24242480] mb-6"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mb-4"
                />
                <button
                  type="submit"
                  className="text-[16px] mb-[425px] lg:mb-[20px] font-bold w-full h-[44px] text-white bg-gradient-to-r from-custom-light-blue to-custom-purple rounded-md"
                >
                  Send reset link
                </button>
              </div>
              <div>
                <img
                  src={mark}
                  alt="markicon"
                  className="hidden lg:block max-w-full h-auto"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
