import React from "react";
import AdminMenu from "../../components/AdminMenu";
import AdminDetails from "../../components/AdminDetails";
import { useContext } from "react";
import CategoryContext from "../../context/categoryContext";

const AdminDashboard = () => {
  const context = useContext(CategoryContext);
  const {
  } = context;
  return (
    <div className="mt-24 flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit">
        <AdminDetails />
      </div>
    </div>
  );
};

export default AdminDashboard;
