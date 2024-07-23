import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="w-fit shadow flex flex-col h-fit px-2">
      <div className="mt-3 mb-3 mr-auto ml-auto text-slate-500/70 lg:text-3xl text-xl font-sans font-thin text-center w-fit h-fit px-2 py-1 shadow-md rounded-full">
        Admin Panel
      </div>
      <Link
        to="/dashboard/admin"
        className="flex flex-row justify-center items-center md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
      >
        Dashboard
      </Link>
      <Link
        to="/dashboard/admin/create-category"
        className="flex flex-row justify-center items-center md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
      >
        Create Category
      </Link>
      <Link
        to="/dashboard/admin/create-product"
        className="flex flex-row justify-center items-center md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
      >
        Create Products
      </Link>
      <Link
        to="/dashboard/admin/show-product"
        className="flex flex-row justify-center items-center md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
      >
        Show Products
      </Link>
      <Link
        to="/dashboard/admin/users"
        className="flex flex-row justify-center items-center md:w-[20vw] w-[30vw] border-b-2 border-slate-500/20 text-center py-2 lg:text-xl text-md px-5 text-slate-700 hover:bg-slate-500/10"
      >
        Show All Users
      </Link>
    </div>
  );
};

export default AdminMenu;
