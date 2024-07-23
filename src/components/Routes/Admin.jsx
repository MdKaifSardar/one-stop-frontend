import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('user-id');

  const authCheck = async () => {
    const userData = new FormData();
    userData.append("userId", userId);
      const response = await fetch(
        "http://localhost:8080/api/v1/auth/admin-auth",
        {
          method: "POST",
          headers: {
            "authorisation": token,
          },
          body: userData,
        },
      );
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
    }
    else{
      console.log('no token found1');
    }
  }, []);

  return ok ? <Outlet /> : <Spinner path={localStorage.getItem('token')?'/':'/login'}/>;
};

export default AdminRoute;
