import React from "react";
import toast from "react-hot-toast";
import { Route, Navigate, Outlet } from "react-router-dom";
import ProjectsList from "../components/ProjectsList";
import { useAuth } from "../contexts/authContext";

const PrivateRoute = (props) => {
  const { user } = useAuth();

  return <>{user ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoute;
