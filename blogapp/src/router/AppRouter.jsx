import React from "react";
import { Navigate, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserInfos from "../pages/UserInformation/UserAccountInfos";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import PrivateRooter from "./PrivateRooter";
import userPost from "../components/UserPost";
import UserPost from "../components/UserPost";
import PostDetails from "../pages/PostDetails";

const AppRouter = () => {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/userinfos" element={<UserInfos />} />
      <Route path="/postDetails" element={<PrivateRooter/>}>
        <Route path="" element={<PostDetails/>}/>
      </Route>

      <Route path="/userposts" element={<PrivateRooter/>}>
        <Route path="" element={<UserPost/>}/>
      </Route>



      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
};

export default AppRouter;
