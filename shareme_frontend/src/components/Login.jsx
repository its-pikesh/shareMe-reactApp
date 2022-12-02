import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  const [activeBtn, setActiveBtn] = useState("signUp");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginState = false;
  const activeBtnStyles =
    "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
  const notActiveBtnStyles =
    "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

  const signUp = (e) => {
  };
  const login = (e) => {
  };
  const responseGoogle = (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(decoded));
    const { name, sub, picture } = decoded;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-ful h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
          {loginState && (
            <div>
            <div className="mt-3 bg-gray-100 rounded-md px-3">
            <button
              onClick={(e) => setActiveBtn("login")}
              type="button"
              className={`${
                activeBtn === "login" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Login
            </button>
            <button
              onClick={(e) => setActiveBtn("signUp")}
              type="button"
              className={`${
                activeBtn === "signUp" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              SignUp
            </button>
          </div>
          {activeBtn === "login" ? (
            <div className="mt-4 flex flex-col">
              <h3 className="text-white text-center">Login to your Account</h3>
              <input
                type="email"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter Your Email"
                className="mt-2 px-2 py-1 rounded-lg"
              />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="mt-2 px-2 py-1 rounded-lg"
              />
              <button
                type="button"
                onClick={login}
                className="bg-red-500 text-white font-bold p-2 rounded-full outline-none mt-3"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col">
              <h3 className="text-white text-center">Create a Account</h3>
              <input
                type="email"
                placeholder="Enter  Email"
                onChange={(e) => setEmailId(e.target.value)}
                className="mt-2 px-2 py-1 rounded-lg"
              />
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 px-2 py-1 rounded-lg"
              />
              <button
                type="button"
                onClick={signUp}
                className="bg-red-500 text-white font-bold p-2 rounded-full outline-none mt-3"
              >
                SignUp
              </button>
            </div>
              )}
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
