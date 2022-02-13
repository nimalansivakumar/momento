import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { useAuth } from "../contexts/authContext";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";

const Navbar = () => {
  const { isloggedin, logout } = useAuth();
  const [isOpen, setOpen] = useState(false);

  const logoutSession = () => {
    toast.promise(logout(), {
      loading: "Logging Out...",
      success: <b>Logged Out Successfully!</b>,
      error: <b>Could not Log Out.</b>,
    });
  };

  const openMenu = () => {
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <nav className="w-full h-20 bg-transparent flex justify-between items-center font-man text-dark top-0">
      <div>
        <Link to="/">
          <img src={Logo} className="w-10 mx-10 " />
        </Link>
      </div>
      <ul className="w-1/3 h-auto font-man font-semibold flex justify-around items-center mb:hidden">
        <Link to="/dashboard">
          <li>Dashboard</li>
        </Link>
        <Link to="/projects">
          <li>Projects</li>
        </Link>
        {/* <li>
          <img src={Logo} className="w-10" />
        </li> */}
        <li className="mb:hidden">
          {isloggedin ? (
            <button
              onClick={logoutSession}
              className="w-24 h-10 rounded bg-dark rounded-lg text-white border-2"
            >
              Log Out
            </button>
          ) : null}
        </li>
      </ul>
      {isOpen ? (
        <XIcon onClick={closeMenu} className="w-10 mx-10 hidden mb:block" />
      ) : (
        <MenuAlt2Icon
          onClick={openMenu}
          className="w-10 mx-10 hidden mb:block"
        />
      )}
      {isOpen ? (
        <motion.div
          initial={{ x: 250 }}
          animate={{ x: 0 }}
          transition={{ delay: "0.4s" }}
          className="w-56 h-88 bg-card absolute top-20 right-0 z-10"
        >
          <ul className="w-full h-36 font-man font-semibold flex flex-col justify-around items-center">
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/projects">
              <li>Projects</li>
            </Link>
            <li className="mb:block">
              {isloggedin ? (
                <button
                  onClick={logoutSession}
                  className="w-24 h-10 rounded bg-dark rounded-lg text-white border-2"
                >
                  Log Out
                </button>
              ) : null}
            </li>
          </ul>
        </motion.div>
      ) : null}
    </nav>
  );
};

export default Navbar;
