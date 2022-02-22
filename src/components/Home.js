import React from "react";
import googleLogo from "../assets/google.png";
import { motion } from "framer-motion/dist/framer-motion";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";
import peeps from "../assets/peeps.svg";

export default function Home() {
  const { isloggedin, signUpWithGoogle } = useAuth();

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
      className="w-full h-88 font-man text-dark bg-cover flex flex-col items-center box-border mb:"
      style={{
        backgroundImage: `url(${peeps})`,
        zIndex: "-1",
        backgroundSize: "700px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom 0% left 50%",
      }}
    >
      <motion.div
        className="w-full h-36 text-center flex flex-col justify-around items-center"
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
            onClick={handleGoogleAuth}
            className="w-48 h-10 rounded bg-white rounded-lg text-dark border-2 flex flex-row justify-evenly items-center"
          >
            <img src={googleLogo} alt="googleLogo" className="w-5" />
            <span>Log in With Google</span>
          </button>
        )}
      </motion.div>
      {/* <img className="w-1/2 absolute bottom-0" src={peeps} /> */}
    </div>
  );
}
