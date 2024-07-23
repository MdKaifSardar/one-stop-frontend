import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import AdminDetails from '../../components/AdminDetails'

const Users = () => {
  return (
    <div className="mt-24 flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit">
        <AdminDetails />
        here are the suers
      </div>
    </div>
  );
}

export default Users
