import React from "react";
import googleLogo from "../assets/google.png";
import { motion } from "framer-motion/dist/framer-motion";
import { useAuth } from "../contexts/authContext";
import toast from "react-hot-toast";
import peeps from "../assets/peeps.svg";
import nimalan from "../assets/nimalan.jpeg";

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
    <div className="w-full h-full">
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
          className="w-full h-36 text-center flex flex-col justify-around items-center mb:h-56"
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
      </div>
      <footer className="w-full h-96 flex items-center justify-center mb:h-auto">
        <div className="w-1/2 h-3/4 bg-card rounded shadow-xl flex flex-row items-center justify-around font-man text-dark mb:w-5/6 mb:flex-col my-5 mb:h-auto">
          <img className="w-44 rounded-2xl mb:m-5" src={nimalan} />
          <div className="w-1/2 h-full flex flex-col items-start justify-center mb:w-3/4 m-5">
            <h1 className="text-2xl font-bold py-2">Hey! I am Nimalan.</h1>
            <h4 className="">
              Creator of{" "}
              <a
                href="https://momento-app.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="text-dark font-bold"
              >
                Momento
              </a>{" "}
              and{" "}
              <a
                href="https://dev-connect.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 font-bold"
              >
                DevConnect.
              </a>{" "}
            </h4>
            <h4 className="">
              I am a Web developer with love towards building products.
            </h4>
            <a
              href="https://twitter.com/nimalancodes"
              target="_blank"
              rel="noreferrer"
            >
              <button className="w-44 h-10 my-2 rounded text-white bg-blue-300">
                Follow me on Twitter
              </button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
