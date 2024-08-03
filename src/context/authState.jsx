import React, { useEffect, useState } from "react";
import AuthContext from "./authContext";
import { useNavigate } from "react-router-dom";

const AuthState = (props) => {
  let location = useNavigate();
  const [auth, setAuth] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    role: 0,
    date: "",
    id: "",
  });
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
  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch("/api/v1/auth/get-user-details", {
        method: "GET",
        headers: {
          authorisation: token,
        },
      });

      const json = await response.json();
      const user = json.user;
      props.setIsLoading(false);
      if (json.success) {
        setAuth({
          name: user.name,
          address: user.address,
          email: user.email,
          phone: user.phone,
          role: user.role,
          date: user.createdAt,
          id: user._id,
        });
      } else {
        props.showAlert("Something went wrong", "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("Something went wrong", "danger");
      props.setIsLoading(false);
    }
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
      localStorage.setItem("userId", json.user.id);
      getUserDetails();
      setCredentials({});
      navigate("/");
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
      localStorage.setItem("userId", json.user.id);
      setCredentials({});
      getUserDetails();
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
  };
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
