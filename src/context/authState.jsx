import React, { useEffect, useState } from "react";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  let location = useNavigate()
  const [auth, setAuth] = useState({
    user: {},
    token: "",
  })
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    address: "",
    answer: "",
  });
  let navigate = useNavigate();

  // getting the user details:
  const getUserDetails = (json) => {
    const { name, email, address, phone, date } = json;
    localStorage.setItem("user_name", name);
    localStorage.setItem("user_email", email);
    localStorage.setItem("user_phone", phone);
    localStorage.setItem("user_address", address);
    const userDate = new Date(date);
    const year = userDate.getUTCFullYear();
    const month = userDate.getMonth();
    const day = userDate.getDate();
    localStorage.setItem("user_year", year);
    localStorage.setItem("user_month", month);
    localStorage.setItem("user_day", day);
  };
  
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (json.success) {
      props.showAlert("Succesfully logged into your account", "success");
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("role", json.user.role);
      localStorage.setItem("user-id", json.user.id);
      localStorage.setItem("cart", JSON.stringify([]));
      setAuth({
        user: json.user,
        token: json.authToken,
      })
      getUserDetails(json.user);
      setCredentials({});
      navigate(location.state || "/");
    }
    if (!json.success) {
      props.showAlert(json.message, "danger");
    }
  };

  // submit funciton at the sign up page:
  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, address, phone, answer } = credentials;
    const response = await fetch("/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, address, phone, answer }),
    });
    const json = await response.json();
    if (json.success) {
      props.showAlert("Succesfully signed up", "success");
      localStorage.setItem("token", json.authToken);
      localStorage.setItem("role", json.user.role);
      localStorage.setItem("user-id", json.user.id);
      localStorage.setItem("cart", JSON.stringify([]));
      setAuth({
        user: json.user,
        token: json.authToken,
      })
      setCredentials({});
      getUserDetails(json.user);
      navigate("/");
    }
    if (!json.success) {
      props.showAlert(json.error, "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitUpdatePass = async (e) => {
    e.preventDefault();
    const { email, password, answer } = credentials;
    const response = await fetch("/api/v1/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, answer }),
    });
    const json = await response.json();
    if (json.success) {
      props.showAlert(json.message, "success");
      setCredentials({});
      navigate("/login");
    }
    if (!json.success) {
      props.showAlert(json.error, "danger");
    }
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        handleSubmitUpdatePass,
        getUserDetails,
        logout,
        setCredentials,
        handleSubmitLogin,
        handleSubmitSignup,
        credentials,
        onChange,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
