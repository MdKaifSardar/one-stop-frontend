import React from "react";
import { useLocation } from "react-router-dom";

function Alert(props) {
  const location = useLocation();
  return location.pathname.startsWith("/dashboard")
    ? props.alert && (
        <div
          className={`fixed mt-[58px] w-[100%] alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.msg}</strong>
        </div>
      )
    : props.alert && (
        <div
          className={`fixed top-[75px] w-[100%] alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{props.alert.msg}</strong>
        </div>
      );
}

export default Alert;
