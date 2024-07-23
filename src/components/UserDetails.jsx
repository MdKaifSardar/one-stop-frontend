import React from "react";

const UserDetails = () => {
  return (
    <div className="flex flex-col bg-slate-500/20 gap-2 justify-start w-full h-full shadow p-2">
      <span className="p-2 flex gap-2 flex-row md:text-xl text-md shadow-md w-full">
        <span className="font-semibold">Name:</span>{" "}
        <span>{localStorage.getItem("user_name")}</span>
      </span>
      <span className="p-2 flex gap-2 flex-row md:text-xl text-md shadow-md w-full">
        <span className="font-semibold">Email:</span>{" "}
        <span>{localStorage.getItem("user_email")}</span>
      </span>
      <span className="p-2 flex gap-2 flex-row md:text-xl text-md shadow-md w-full">
        <span className="font-semibold">Phone:</span>{" "}
        <span>{localStorage.getItem("user_phone")}</span>
      </span>
      <span className="p-2 flex gap-2 flex-row md:text-xl text-md shadow-md w-full">
        <span className="font-semibold">Address:</span>{" "}
        <span>{localStorage.getItem("user_address")}</span>
      </span>
    </div>
  );
};

export default UserDetails;
