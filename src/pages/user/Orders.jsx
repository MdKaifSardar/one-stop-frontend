import React from 'react'
import OrderDetails from '../../components/OrderDetails'
import UserMenu from '../../components/UserMenu'

const Orders = () => {
  return (
    <div className="mt-24 flex flex-row justify-center w-[100%] items-center">
      <UserMenu />
      <div className="flex flex-col w-full h-[100vh]">
        <OrderDetails />
      </div>
    </div>
  )
}

export default Orders
