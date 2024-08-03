import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../context/productContext";
import FilterContext from "../context/filterContext.js";
import { Checkbox } from "antd";
import { Radio } from "antd";
import { Prices } from "../constants/Prices.js";
import MainProductCard from "../components/products/MainProductCard.jsx";

const Home = ({ products, showAlert }) => {
  const filterContext = useContext(FilterContext);
  const {
    priceName,
    setPriceName,
    catName,
    price,
    cat,
    handleChangeCat,
    setPrice,
    handleFilterProducts,
    currentPage,
    prevPage,
    nextPage,
    totalPages,
  } = filterContext;
  const productContext = useContext(ProductContext);
  const { showAllCategory, categories } = productContext;

  useEffect(() => {
    showAllCategory();
  }, []);

  useEffect(() => {
    if (cat.length || price.length) {
      handleFilterProducts();
    }
  }, [cat, price]);

  return (
    <div className="mb-10 mt-[75px] flex md:flex-row flex-col justify-start items-start gap-2 w-full content-start">
      <div className="md:w-fit w-full flex flex-col justify-center items-start shadow">
        <div className="w-full h-fit flex flex-col gap-1 p-2">
          <div>Filter by category</div>
          <div className="flex md:flex-col flex-wrap">
            {categories && categories.length ? (
              categories.map((cat, index) => (
                <Checkbox
                  key={index}
                  onChange={(e) =>
                    handleChangeCat(e.target.checked, cat._id, cat.name)
                  }
                >
                  {cat.name}
                </Checkbox>
              ))
            ) : (
              <p>no categories found</p>
            )}
          </div>
        </div>
        <hr className="text-slate-500 w-11/12 font-bold mr-auto ml-auto" />
        <div className="w-full h-fit flex flex-col gap-1 p-2">
          <div>Filter by price</div>
          <div>
            <Radio.Group className="flex md:flex-col flex-wrap">
              {Prices && Prices.length ? (
                Prices.map((p, index) => (
                  <div key={index}>
                    <Radio
                      value={p.array}
                      onClick={() => {
                        setPrice(p.array);
                        setPriceName(p.name);
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
        </div>
        <div className="py-2 flex flex-col justify-center items-center w-full">
          <button
            className="p-2 border-1 hover:bg-red-500 hover:text-white border-red-500 shadow-md text-red-500 font-sans font-semibold rounded-full"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col content-center">
        <div className="flex flex-col">
          <div className="flex flex-col gap-2 px-3">
            <div className="flex gap-2 flex-wrap justify-start rounded-md">
              {catName && catName.length ? (
                catName.map((name, index) => (
                  <span
                    key={index}
                    className="rounded-md shadow-md p-1 flex flex-row"
                  >
                    {name}
                  </span>
                ))
              ) : (
                <p className="shadow-md p-1 rounded-md">All Category</p>
              )}
            </div>
            <div className="p-1 shadow-md w-fit rounded-md">{priceName}</div>
          </div>
          <div className="grid md:grid-cols-4 grid-cols-2 grid-auto-rows content-center gap-3 p-3">
            {products && products.length ? (
              products.map((product, index) => (
                <MainProductCard
                  key={index}
                  product={product}
                  showAlert={showAlert}
                />
              ))
            ) : (
              <p>no products found</p>
            )}
          </div>
          <div>
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
      </div>
    </div>
  );
};

export default Home;
