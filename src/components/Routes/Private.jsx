import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import React from "react";
import Spinner from "../Spinner";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const token = localStorage.getItem('token');

  const authCheck = async () => {
      const response = await fetch(
        "/api/v1/auth/user-auth",
        {
          method: "GET",
          headers: {
            "authorisation": token,
          },
        }
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

export default PrivateRoute;
