import React, { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ForgotPass = (props) => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const { credentials, handleSubmitUpdatePass, onChange } = context;
  const { email, password, answer } = credentials;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.showAlert("you are already logged in.", "danger");
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className="flex flex-col justify-center items-center mt-32 mb-12 px-2">
      <form
        onSubmit={handleSubmitUpdatePass}
        className="px-1 flex flex-col justify-center items-center shadow rounded-2xl py-4 w-fit gap-3"
      >
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
            htmlFor="answer"
            className="sm:text-lg text-sm font-sans font-normal text-black"
          >
            What is your favourite sports?
          </label>
          <input
            type="text"
            required
            className="form-control"
            value={answer}
            id="answer"
            name="answer"
            aria-describedby="emailHelp"
            placeholder="Enter Secret Answer"
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
          disabled={email === "" && password === "" && answer === ""}
          className="shadow bg-gradient-to-l text-white rounded-xl from-blue-300 to-blue-500 px-3 py-2 hover:from-blue-500 hover:to-blue-300 font-normal font-sans sm:text-lg text-md hover:cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPass;
