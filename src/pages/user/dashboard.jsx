import React from 'react'
import UserMenu from '../../components/UserMenu';

const Dashboard = () => {
  return (
    <div className="mt-24 flex flex-row justify-center w-[100%] items-center">
        <UserMenu />
        <div className="flex flex-col w-full h-[100vh]">
        this is a div
        </div>
    </div>
  );
}

export default Dashboard
