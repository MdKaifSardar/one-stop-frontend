import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../context/productContext";
import AdminMenu from "./AdminMenu";
import AdminDetails from "./AdminDetails";
import ProductCard from "./products/ProductCard";
import FindProductsForm from "./products/FindProductsForm";
import SearchContext from "../context/searchContext";

const ShowProduct = ({ products }) => {
  const context = useContext(ProductContext);
  const { showAllCategory } = context;
  const searchContext = useContext(SearchContext);
  const {
    totalProducts,
    searchProducts,
    currentPage,
    totalPages,
    foundProd,
    nextPage,
    prevPage,
  } = searchContext;

  useEffect(() => {
    showAllCategory();
    searchProducts();
  }, []);
  return (
    <div className="bg-slate-300/10 mt-[58px] flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit">
        <AdminDetails />
        <FindProductsForm />
        <div className="mt-2 my-2 ml-4 flex flex-row font-sans shadow-md w-fit rounded-md">
          <span className="p-1">
            Total <span className="font-semibold">{totalProducts}</span>{" "}
            products found
          </span>
        </div>
        <div className="w-[100%] shadow-md px-3 py-1 flex flex-col gap-2 justify-center items-start">
          {foundProd && foundProd.length ? (
            foundProd.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <p className="p-2 sm:text-xl text-md">No products found</p>
          )}
        </div>
        {totalPages ? (
          <div className="flex flex-row justify-center items-center p-2">
            <button
              disabled={currentPage === 1}
              onClick={prevPage}
              className="hover:bg-slate-300/20 rounded-full gap-2 flex flex-row justify-center items-center p-2 text-black sm:text-md text-center"
            >
              <i className="fa-solid fa-arrow-left"></i>
              <span>Prev</span>
            </button>
            <div className="flexw justify-center items-center text-center flex-rotext-black font-sans text-xl rounded-full p-2 h-10 w-10 shadow-md">
              {currentPage}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={nextPage}
              className="hover:bg-slate-300/20 rounded-full gap-2 flex flex-row justify-center items-center p-2 text-black sm:text-md text-center"
            >
              <span>Next</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShowProduct;
