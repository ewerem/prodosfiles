import React, { useState } from "react";
import Home from "../assets/Home.png";
import FTP from "../assets/FTP.png";
import Rating from "../assets/Rating.png";
import Disposal from "../assets/Disposal.png";
import AddFolder from "../assets/AddFolder.png";
import LogoutRounded from "../assets/LogoutRounded.png";
import { Link } from "react-router-dom";
// import starred from '../../assets/starred.png';
// import upload from '../../assets/upload.png';
// import user from '../../assets/user.png';

const Sidebar = () => {
  return (
    // <div className="fixed top-0 left-0 hidden md:block w-[280px] h-screen  p-4 border-r-[1px] bg-white">

    //     <p className='font-[Poppins] text-[#773DD3] text-xl mt-[20px] font-extrabold ml-[22px]'>Prodoos<span className='font-light'>Files</span></p>
    //   <div className='flex ml-[14px] mt-[45px] '><img className='object-contain ' src={Home} alt=""/> <h3 className='text-sm font-[Poppins] text-[#242424] font-normal'>Dashboard</h3></div>
    //   <div className='flex ml-[14px] mt-[35px]'><img className='object-contain' src={FTP} alt=""/> <h3 className='text-sm font-[Poppins] text-[#242424] font-normal'>Folders</h3></div>
    //   <div className='flex ml-[14px] mt-[35px]'><img className='object-contain' src={Rating} alt=""/> <h3 className='text-sm font-[Poppins] text-[#242424] font-normal'>Starred</h3></div>
    //   <div className='flex ml-[14px]  mt-[35px] '><img className='object-contain' src={Disposal} alt=""/> <h3 className='text-sm font-[Poppins] text-[#242424] font-normal'>Recylce Bin</h3></div>
    //   <div className='flex ml-[14px] mt-[35px] '><img className='object-contain' src={AddFolder} alt=""/> <h3 className='text-sm font-[Poppins] text-[#242424] font-normal'>Create</h3></div>
    //   <div className='flex ml-[14px] mt-[35px] '><img className='object-contain' src={LogoutRounded} alt=""/> <h3 className='text-sm font-[Poppins] text-[#242424] font-normal'>Logout</h3></div>
    // </div>

    <div className="fixed top-0 left-0 hidden md:block w-[280px] h-screen p-4 border-r-[1px] bg-white">
      <p className="font-[Poppins] text-[#773DD3] text-xl mt-[20px] font-extrabold ml-[22px]">
        Prodoos<span className="font-light">Files</span>
      </p>

      <div className="flex ml-[14px] mt-[45px]">
        <img className="object-contain" src={Home} alt="Dashboard" />
        <Link
          to="/dashboard"
          className="text-sm font-[Poppins] text-[#242424] font-normal ml-2"
        >
          Dashboard
        </Link>
      </div>

      <div className="flex ml-[14px] mt-[35px]">
        <img className="object-contain" src={FTP} alt="Folders" />
        <Link
          to="/folders"
          className="text-sm font-[Poppins] text-[#242424] font-normal ml-2"
        >
          Folders
        </Link>
      </div>

      <div className="flex ml-[14px] mt-[35px]">
        <img className="object-contain" src={Rating} alt="Starred" />
        <Link
          to="/starred"
          className="text-sm font-[Poppins] text-[#242424] font-normal ml-2"
        >
          Starred
        </Link>
      </div>

      <div className="flex ml-[14px] mt-[35px]">
        <img className="object-contain" src={Disposal} alt="Recycle Bin" />
        <Link
          to="/recyclebin"
          className="text-sm font-[Poppins] text-[#242424] font-normal ml-2"
        >
          Recycle Bin
        </Link>
      </div>

      <div className="flex ml-[14px] mt-[35px]">
        <img className="object-contain" src={AddFolder} alt="Create Folder" />
        <Link
          to="/create"
          className="text-sm font-[Poppins] text-[#242424] font-normal ml-2"
        >
          Create
        </Link>
      </div>

      <div className="flex ml-[14px] mt-[35px]">
        <img className="object-contain" src={LogoutRounded} alt="Logout" />
        <Link
          to="/logout"
          className="text-sm font-[Poppins] text-[#242424] font-normal ml-2"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
