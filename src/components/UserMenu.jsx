import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="sm:w-fit w-[50vw] shadow flex flex-col h-[100vh] px-2">
      <div className="mt-3 mb-3 mr-auto ml-auto text-slate-500/70 lg:text-3xl text-xl font-sans font-thin text-center w-fit h-fit px-2 py-1 shadow-md rounded-full">
        User Area
      </div>
      <div className="flex flex-row justify-center items-center">
        <Link
          to="/dashboard/user/profile"
          className="md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
        >
          Profile
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center">
        <Link
          to="/dashboard/user/orders"
          className="md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
        >
          orders
        </Link>
      </div>
    </div>
  );
};

export default UserMenu;
