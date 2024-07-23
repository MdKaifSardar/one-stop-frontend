import React from 'react'
import PrdouctUpdateForm from './PrdouctUpdateForm'
import AdminDetails from '../AdminDetails'
import AdminMenu from '../AdminMenu'

const ProductUpdate = () => {
  return (
    <div className="mt-24 flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit">
        <AdminDetails />
        <PrdouctUpdateForm/>
      </div>
    </div>
  )
}

export default ProductUpdate
