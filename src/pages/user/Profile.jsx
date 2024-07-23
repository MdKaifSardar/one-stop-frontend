import React from "react";
import UserDetails from "../../components/UserDetails";
import UserMenu from "../../components/UserMenu";

const Profile = () => {
  return (
    <div className="mt-24 flex flex-row justify-center w-[100%] items-center">
      <UserMenu />
      <div className="flex flex-col w-full h-[100vh]">
        <UserDetails />
      </div>
    </div>
  );
};

export default Profile;
