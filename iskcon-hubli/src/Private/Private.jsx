import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Private = ({ children }) => {


  // Retrieve and parse admin data from localStorage
  const adminData = JSON.parse(localStorage.getItem("admin")) || {};

  console.log("Stored Admin Data:", adminData);

  const isAuthenticated = adminData?.email === "admin" && adminData?.password === "admin";
  console.log("Is Authenticated:", isAuthenticated);


  if (!isAuthenticated) {
    return <Navigate to={"/admin"} />;
  }

  return children;
};

export default Private;
