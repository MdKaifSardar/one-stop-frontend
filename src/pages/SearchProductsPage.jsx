import React, { useEffect } from "react";
import { useContext } from "react";
import SearchContext from "../context/searchContext";
import SearchProductCard from "../components/products/SearchProductCard";
import { Prices } from "../constants/Prices";
import { Radio } from "antd";

const SearchProductsPage = ({ showAlert }) => {
  const context = useContext(SearchContext);
  const {
    searchProducts,
    foundProd,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    price,
    setPrice,
  } = context;

  useEffect(() => {
    searchProducts();
  }, [price]);

  return (
    <div className="mt-[75px] mb-10 flex flex-row w-full h-fit">
      <div className="flex flex-col w-fit h-fit p-2 bg-slate-300/20">
        <Radio.Group className="flex flex-col">
          {Prices && Prices.length ? (
            Prices.map((p, index) => (
              <div key={index}>
                <Radio
                  value={p.array}
                  onClick={() => {
                    setPrice(p.array);
                  }}
                >
                  {p.name}
                </Radio>
              </div>
            ))
          ) : (
            <p>no price range found</p>
          )}
        </Radio.Group>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-fit">
        <div className="flex flex-col justify-center items-center w-full">
          {foundProd && foundProd.length ? (
            foundProd.map((prod, index) => (
              <SearchProductCard
                key={index}
                product={prod}
                showAlert={showAlert}
              />
            ))
          ) : (
            <p>No products found</p>
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

export default SearchProductsPage;
