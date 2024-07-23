import React, { useContext, useEffect } from "react";
import AuthContext from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = (props) => {
  const context = useContext(AuthContext);
  const { credentials, handleSubmitLogin, onChange } = context;
  const { email, password } = credentials;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.showAlert("you are already logged in.", "danger");
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="mb-5 flex flex-col justify-center items-center p-2 mr-auto ml-auto w-full mt-[90px]">
      <form
        onSubmit={handleSubmitLogin}
        className="px-1 flex flex-col justify-center items-center shadow rounded-2xl py-4 w-fit gap-3"
      >
        <span className="sm:text-3xl text-2xl font-bold font-sans text-blue-500/50 text-center">
          Login to SkillSync
        </span>

        <div className="flex flex-col justify-center w-2/3">
          <label
            htmlFor="email"
            className="sm:text-lg text-sm font-sans font-normal text-black"
          >
            Enter email address
          </label>
          <input
            type="email"
            required
            className="form-control"
            value={email}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            onChange={onChange}
          />
        </div>

        <div className="flex flex-col justify-center w-2/3">
          <label
            htmlFor="password"
            className="sm:text-lg text-sm font-sans font-normal text-black"
            required
          >
            Enter password
          </label>
          <input
            onChange={onChange}
            type="password"
            value={password}
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Password"
          />
        </div>

        <button
          type="submit"
          disabled={credentials.email === "" && credentials.password === ""}
          className="shadow bg-gradient-to-l text-white rounded-xl from-blue-300 to-blue-500 px-3 py-2 hover:from-blue-500 hover:to-blue-300 font-normal font-sans sm:text-lg text-md hover:cursor-pointer"
        >
          Login
        </button>
        <div className="flex flex-wrap justify-center items-center w-4/5">
          <span className="text-sans text-black text-center text-thin">
            Don't have an account?
          </span>
          <Link
            className="font-semibold hover:text-blue-500 text-semibold text-center"
            to="/signup"
          >
            Click here
          </Link>
          <span>to create one</span>
        </div>
        <div className='text-center'>
          <Link className="text-center sm:text-md text-sm text-blue-500 underline" to='/forgotpass'>forgot password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
