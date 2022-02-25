import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = () => {
  const { isloggedin } = useAuth();

  return <>{isloggedin ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
