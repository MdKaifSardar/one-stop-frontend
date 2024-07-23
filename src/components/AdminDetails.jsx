import React from "react";

const AdminDetails = () => {
  return (
    <div className="flex md:flex-row flex-col bg-slate-500/20 gap-2 justify-between w-full h-fit shadow-md p-2">
      <span className="flex flex-col md:text-xl text-sm">
        <span className="font-semibold">Name:</span>{" "}
        <span>{localStorage.getItem("user_name")}</span>
      </span>
      <span className="flex flex-col md:text-xl text-sm">
        <span className="font-semibold">Email:</span>{" "}
        <span>{localStorage.getItem("user_email")}</span>
      </span>
      <span className="flex flex-col md:text-xl text-sm">
        <span className="font-semibold">Phone:</span>{" "}
        <span>{localStorage.getItem("user_phone")}</span>
      </span>
      <span className="flex flex-col md:text-xl text-sm">
        <span className="font-semibold">Address:</span>{" "}
        <span>{localStorage.getItem("user_address")}</span>
      </span>
    </div>
  );
};

export default AdminDetails;
