import React, { useEffect } from "react";
import { useContext } from "react";
import FilterContext from "../context/filterContext";
import MainProductCard from "../components/products/MainProductCard";

const Category = ({ products }) => {
  const context = useContext(FilterContext);
  const { cat, handleFilterProducts } = context;
  useEffect(() => {
    handleFilterProducts();
  }, [cat]);
  return (
    <div className="mt-[75px] w-full p-2 grid grid-row-auto grid-cols-3">
      {products && products.length ? (
        products.map((prod, index) => (
          <MainProductCard key={index} product={prod} />
        ))
      ) : (
        <div className="flex w-[98vw] flex-row  justify-center items-center p-2 h-screen sm:text-xl text-md text-center">No products found</div>
      )}
    </div>
  );
};

export default Category;
