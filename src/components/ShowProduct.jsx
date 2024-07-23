import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../context/productContext";
import AdminMenu from "./AdminMenu";
import AdminDetails from "./AdminDetails";
import ProductCard from "./products/ProductCard";
import FindProductsForm from "./products/FindProductsForm";

const ShowProduct = ({products}) => {
  const context = useContext(ProductContext);
  const { ShowAllProducts, showAllCategory } = context;

  useEffect(() => {
    ShowAllProducts();
    showAllCategory();
  }, []);
  return (
    <div className="mt-[75px] flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit">
        <AdminDetails />
        <FindProductsForm />
        <div className="w-[100%] bg-slate-300/10 shadow-md p-3 flex flex-col gap-2 justify-center items-start">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="p-2 sm:text-xl text-md">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
