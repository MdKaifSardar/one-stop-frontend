import React from 'react'
import AdminMenu from '../../components/AdminMenu'
import AdminDetails from '../../components/AdminDetails'
import CreateProductForm from '../../components/products/CreateProductForm';


const CreateProduct = () => {
  return (
    <div className="mt-[58px] flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit">
        <AdminDetails />
        <CreateProductForm/>
      </div>
    </div>
  );
}

export default CreateProduct
