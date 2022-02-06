import React, { useState } from "react";
import bottomEllipse from "../assets/bottomEllipse.svg";
import topEllipse from "../assets/topEllipse.svg";
import googleLogo from "../assets/google.png";
import { UserIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion/dist/framer-motion";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";

export default function Home() {
  const { isloggedin, signup, login, signUpWithGoogle } = useAuth();
  const [showAuthBox, setAuthBox] = useState(false);
  const [showSignUp, setSignUp] = useState(false);

  const [credentials, setCredentials] = useState({});

  const checkAuthType = (e) => {
    e.preventDefault();
    if (showSignUp === false) {
      toast.promise(login(credentials.email, credentials.password), {
        loading: "Logging In...",
        success: <b>Logged in Successfully!</b>,
        error: <b>Could not Log in.</b>,
      });
    } else if (showSignUp === true) {
      signup(credentials);
    }
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    toast.promise(signUpWithGoogle(), {
      loading: "Logging In...",
      success: <b>Logged in Successfully!</b>,
      error: <b>Could not Log in.</b>,
    });
  };

  return (
    <div
      className="w-full min-h-screen h-full font-man text-dark bg-cover flex flex-col items-center justify-evenly top-0"
      style={{
        position: "absolute",
        backgroundImage: `url(${bottomEllipse}) , url(${topEllipse})`,
        zIndex: "-1",
        backgroundSize: "500px 500px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left bottom , right top",
      }}
    >
      <motion.div
        className="w-1/2 h-36  text-center flex flex-col justify-around items-center mb:my-10"
        initial={{ y: -250 }}
        animate={{ y: 0 }}
        transition={{ delay: "0.4s" }}
      >
        <h1 className="text-5xl font-extrabold ">Momento</h1>
        <h4 className="text-xl font-semibold">
          Boosts Productivity. Faster progress. Easy work.
        </h4>
        {isloggedin ? null : (
          <button
            className="w-20 h-10 bg-white text-dark border-2 border-dark rounded font-semibold cursor-pointer"
            onClick={() => {
              setAuthBox(true);
            }}
          >
            Log In
          </button>
        )}
      </motion.div>
      {showAuthBox ? (
        <motion.form
          initial={{ y: 250 }}
          animate={{ y: 0 }}
          className="w-1/3 h-1/2 bg-card flex flex-col font-man font-semibold text-lg justify-evenly items-center shadow-xl rounded mb:w-5/6 h-"
        >
          <UserIcon className="w-10 text-dark" />
          {showSignUp ? (
            <motion.div
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ delay: "0.4s" }}
              className="w-2/3 h-auto flex mb:w-3/4"
            >
              <input
                type="text"
                className="w-1/2 mx-1 h-10 rounded shadow p-2 outline-none focus:ring-2"
                placeholder="Firstname"
                onChange={(e) => {
                  setCredentials({ ...credentials, firstname: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-1/2 mx-1 h-10 rounded shadow p-2 outline-none focus:ring-2"
                placeholder="Lastname"
                onChange={(e) => {
                  setCredentials({ ...credentials, lastname: e.target.value });
                }}
              />
            </motion.div>
          ) : null}
          <input
            type="email"
            className="w-2/3 h-10 rounded shadow p-2 outline-none focus:ring-2 mb:w-3/4"
            placeholder="Email"
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
          />
          <input
            type="password"
            className="w-2/3 h-10 rounded shadow p-2 outline-none focus:ring-2 mb:w-3/4"
            placeholder="Password"
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
          />
          <button
            className="w-24  h-10 rounded bg-dark rounded-lg text-white border-2"
            onClick={checkAuthType}
          >
            {showSignUp ? "Sign Up" : "Log In"}
          </button>
          <div className="w-3/4 h-0.5 bg-gray-300 rounded-full"></div>
          <button
            onClick={handleGoogleAuth}
            className="w-32 h-10 rounded bg-white rounded-lg text-dark border-2 flex flex-row justify-evenly items-center"
          >
            <img src={googleLogo} className="w-5" />
            <span>Google</span>
          </button>
          <p
            className="text-gray-500 cursor-pointer hover:underline"
            onClick={() => {
              setSignUp(!showSignUp);
            }}
          >
            {showSignUp ? "Already a user" : "Create Account"}
          </p>
        </motion.form>
      ) : null}
    </div>
  );
}
