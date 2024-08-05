import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
import Spinner from "../Spinner";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const AdminRoute = () => {
  const context = useContext(AuthContext);
  const { getUserDetails } = context;
  const [ok, setOk] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getUserDetails();
  }, []);

  const authCheck = async () => {
    if(!token){
      return;
    }
    const userData = new FormData();
    userData.append("userId", userId);
    const response = await fetch("/api/v1/auth/admin-auth", {
      method: "POST",
      headers: {
        authorisation: token,
      },
      body: userData,
    });
    const json = await response.json();
    if (json.ok) {
      setOk(true);
    } else {
      setOk(false);
    }
  };

  useEffect(() => {
    if (token) {
      authCheck();
    } else {
      console.log("no token found1");
    }
  }, []);

  return ok ? (
    <Outlet />
  ) : (
    <Spinner path={localStorage.getItem("token") ? "/" : "/login"} />
  );
};

export default AdminRoute;
