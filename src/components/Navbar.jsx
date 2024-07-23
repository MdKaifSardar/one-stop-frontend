import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { logo } from "../assets/icons";
import "../css/navbar.css";
import { useContext } from "react";
import AuthContext from "../context/authContext";
import SearchProducts from "./products/searchProducts";
import CategoryContext from "../context/categoryContext";
import FilterContext from "../context/filterContext";
import CartContext from "../context/cartContext";
import { Badge } from "antd";

const Navbar = () => {
  const cartContext = useContext(CartContext);
  const { cart } = cartContext;
  const filterContext = useContext(FilterContext);
  const { setCat } = filterContext;
  const catContext = useContext(CategoryContext);
  const { showAllCategory, categories } = catContext;
  const role = localStorage.getItem("role");
  const context = useContext(AuthContext);
  const { auth, logout } = context;
  const [isOpen, setIsOpen] = useState(false);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [catList, setCatList] = useState(false);
  useEffect(() => {
    showAllCategory();
  }, []);

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };
  const handleCatList = () => {
    setCatList(!catList);
  };
  const handleOnClickProfile = () => {
    setProfileIsOpen(!profileIsOpen);
  };

  return (
    <header className="fixed flex flex-row justify-between items-center top-0 z-10 right-0 left-0 shadow-[0_1px_10px_1px_rgba(163,163,163,0.3)] py-2 bg-white px-2">
      <div className="flex flex-row justify-center items-center sm:gap-3 gap-2">
        <NavLink
          to="/"
          className="rounded-3xl flex flex-row items-center justify-center text-xl gap-1 p-1 hover:text-red-500"
        >
          <img src={logo} alt="Skillsync logo" className="w-7 h-7" />
          <span className="md:block hidden">OneStop</span>
        </NavLink>

        <nav className="disable_small_screen">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 p-2 hover:text-blue-500"
                : "text-black-500 p-2 hover:text-blue-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 p-2 hover:text-blue-500"
                : "text-black-500 p-2 hover:text-blue-500"
            }
          >
            Contact
          </NavLink>
          {!localStorage.getItem("token") && (
            <div className="flex flex-row gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 p-2 " : "text-black-500 p-2 "
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "text-blue-500 p-2" : "text-black-500 p-2"
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>

        <nav className="navbar_item_list">
          <div
            className={`${
              isOpen
                ? "flex flex-col justify-center items-center gap-2 py-2 shadow bg-white absolute top-20 left-20 rounded-xl px-4"
                : "nav_list_closed"
            }`}
          >
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-black-500"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-black-500"
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-black-500"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "text-black-500"
              }
            >
              Sign Up
            </NavLink>
          </div>
          <div
            onClick={handleOnClick}
            className="flex justify-center items-center p-3 nav_item_list_icon rounded-3xl shadow w-10 h-10"
          >
            <i className="fa-solid fa-bars"></i>
          </div>
        </nav>
      </div>
      <div className="flex flex-row items-center sm:gap-3 gap-2">
        <nav>
          <SearchProducts />
        </nav>
        <nav>
          <div className="p-2 flex flex-row hover:cursor-pointer hover:text-blue-500 justify-center items-center rounded-full">
            <Link to={`/cart/${role === "1" ? "admin" : "user"}`}>
              <Badge
                offset={[6, -6]}
                size="default"
                count={cart ? cart.length : null}
              >
                <i className=" fa-solid fa-cart-shopping" />
              </Badge>
            </Link>
          </div>
        </nav>
        <nav>
          <div className="rounded-full text-center w-fit h-fit p-2 hover:cursor-pointer">
            <div className="hover:text-blue-500" onClick={handleCatList}>
              Category
            </div>
            {catList && (
              <div className="py-2 right-16 top-16 rounded-md absolute bg-white flex flex-col justify-center items-center gap-1 shadow">
                <Link
                  className="sm:text-sm text-xs py-1 px-3 hover:bg-slate-300/20 text-center w-full"
                  to={`/all-category`}
                >
                  All Categories
                </Link>
                {categories && categories.length ? (
                  categories.map((cat, index) => (
                    <Link
                      to={`/category/${cat.slug}`}
                      className="sm:text-sm text-xs py-1 px-3 hover:bg-slate-300/20 text-center w-full"
                      onClick={() => setCat(cat._id)}
                      key={index}
                    >
                      {cat.name}
                    </Link>
                  ))
                ) : (
                  <div className="text-center">no category found</div>
                )}
              </div>
            )}
          </div>
        </nav>
        <nav>
          <div onClick={handleOnClickProfile}>
            <div className="p-2 w-10 h-10 shadow-md flex flex-row justify-center items-center rounded-3xl hover:cursor-pointer hover:bg-slate-300/20 hover:text-blue-500">
              <i className="fa-solid fa-user" />
            </div>
            {profileIsOpen && localStorage.getItem("token") ? (
              <div className="shadow absolute top-16 right-2 flex flex-col justify-centeritems-center p-3 bg-white rounded-xl sm:text-sm gap-2">
                <span className="sm:text-lg text-sm flex flex-wrap">
                  <span className="sm:text-lg text-sm font-semibold font-sans">
                    Username:{" "}
                  </span>
                  {localStorage.getItem("user_name")}
                </span>
                <span className="sm:text-lg text-sm flex flex-wrap">
                  <span className="sm:text-lg text-sm font-semibold font-sans">
                    Email:{" "}
                  </span>
                  {localStorage.getItem("user_email")}
                </span>
                <span className="sm:text-lg text-sm flex flex-wrap">
                  <span className="sm:text-lg text-sm font-semibold font-sans">
                    Date Created:
                  </span>
                  {localStorage.getItem("user_day")}/
                  {localStorage.getItem("user_month")}/
                  {localStorage.getItem("user_year")}
                </span>
                <div className="flex flex-row justify-center items-center gap-1">
                  <button
                    className="p-2 w-fit h-fit bg-red-500 text-white font-bold font-sans rounded-xl shadow hover:bg-red-500/70"
                    onClick={logout}
                  >
                    logout
                  </button>
                  <Link
                    to={`/dashboard/${role === "1" ? "admin" : "user"}`}
                    className="p-2 w-fit h-fit border-1 border-blue-500 text-blue-500 font-semibold font-sans rounded-xl shadow hover:border-blue-500/70 hover:text-blue-400"
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            ) : profileIsOpen ? (
              <p className="rounded-xl bg-white text-black shadow flex flex-col justify-center items-center gap-2 p-3 absolute top-20 right-5">
                Login to see your profile
              </p>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
