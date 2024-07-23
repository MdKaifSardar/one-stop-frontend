import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import "../css/signup.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const { credentials, onChange, handleSubmitSignup } = context;
  const { name, email, password, cpassword, address, phone, answer } = credentials;
  const [scrollY, setScrollY] = useState(0);
  const [toggle, setToggle] = useState(false);

  const toggleBtn = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    if (localStorage.getItem("token")) {
      props.showAlert("you are already logged in to your account.", "danger");
      navigate("/");
    }
    // eslint-disable-next-line
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="mb-5 flex flex-col justify-center items-center p-2 mr-auto ml-auto w-full mt-[90px]">
      <form
        onSubmit={handleSubmitSignup}
        className="flex flex-col justify-center items-center rounded-lg shadow py-3 w-fit px-1 gap-2 "
      >
        <span className="shadow-md px-3 py-2 rounded-full sm:text-3xl text-2xl font-bold font-sans text-blue-500/70 text-center">
          Sign Up
        </span>

        <div className="flex flex-row justify-center items-start py-3">
          <div className="flex flex-col justify-center items-center gap-2 w-full">
            <div className="flex flex-col justify-center w-2/3">
              <label
                htmlFor="name"
                className="sm:text-lg text-sm font-sans font-semibold text-black"
              >
                Name
              </label>
              <input
                id="name"
                value={name}
                type="text"
                className="form-control"
                name="name"
                aria-describedby="name"
                onChange={onChange}
                required
                minLength={3}
              />
            </div>

            <div className="flex flex-col justify-center w-2/3">
              <label
                htmlFor="email"
                className="sm:text-lg text-sm font-sans font-semibold text-black"
              >
                Email address
              </label>
              <input
                value={email}
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                onChange={onChange}
                required
              />
            </div>

            <div className="flex flex-col justify-center w-2/3">
              <label
                htmlFor="password"
                className="font-sans font-semibold text-black"
              >
                Password
              </label>
              <input
                value={password}
                type="password"
                id="password"
                name="password"
                className="form-control"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>

            <div className="flex flex-col justify-center w-2/3">
              <label
                htmlFor="cpassword"
                className="sm:text-lg text-sm font-sans font-semibold text-black"
              >
                Confirm Password
              </label>
              <input
                value={cpassword}
                type="cpassword"
                id="cpassword"
                name="cpassword"
                className="form-control"
                onChange={onChange}
                required
                minLength={5}
              />
            </div>
          </div>


          <div className="flex flex-col justify-center items-center w-full gap-2">
            <div className="flex flex-col justify-center w-2/3">
              <label className="sm:text-lg text-sm font-sans font-semibold text-black" htmlFor="address">Address</label>
              <input
              value={address}
              type="text"
              id="address"
              name="address"
              className="form-control"
              onChange={onChange}
              required
              minLength={5}
              />
            </div>
            <div className="flex flex-col justify-center w-2/3">
              <label className="sm:text-lg text-sm font-sans font-semibold text-black" htmlFor="address">Phone No.</label>
              <input
              value={phone}
              type="text"
              id="phone"
              name="phone"
              className="form-control"
              onChange={onChange}
              required
              minLength={10}
              />
            </div>
            <div className="flex flex-col justify-center w-2/3">
              <label className="sm:text-lg text-sm font-sans font-semibold text-black" htmlFor="answer">What is your favourite sports?</label>
              <input
              value={answer}
              type="text"
              id="answer"
              name="answer"
              className="form-control"
              onChange={onChange}
              required
              minLength={1}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="shadow bg-gradient-to-l text-white rounded-xl from-blue-300 to-blue-500 px-3 py-2 hover:from-blue-500 hover:to-blue-300 font-normal font-sans sm:text-lg text-md"
        >
          Sign Up
        </button>
        <div className="flex flex-wrap mt-3 justify-center items-center">
          <div className="text-center">Already have an account?</div>
          <Link
            className="hover:text-white font-bold font-sans text-center"
            to="/login"
          >
            Click here
          </Link>
          <div className="text-center">to log in.</div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
