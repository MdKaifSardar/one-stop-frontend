import React from "react";
import { useContext } from "react";
import CartContext from "../../context/cartContext";

const SearchProductCard = ({ product, showAlert }) => {
  const context = useContext(CartContext);
  const { isAdded, addToCart, removeItem } = context;
  return (
    <div className="flex flex-row w-full h-fit bg-slate-200/20 shadow-md items-center rounded-md gap-4 p-3">
      <div className="flex felx-row justify-center items-center sm:w-[40vh] w-[30vh] h-full">
        <img
          className="w-full h-full"
          src={`/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
        />
      </div>
      <div className="flex flex-col justify-between items-start w-fit">
        <div className="h-full flex flex-col justify-start w-fit">
          <div className="flex flex-row w-full justify-between items-center">
            <span className="sm:text-2xl text-lg font-sans sm:font-semibold">
              {product.name}
            </span>
          </div>
          <span className="sm:text-xl text-md font-sans">
            {product.description}
          </span>
          <span className="sm:text-xl text-lg ">{product.price}</span>
          <span>In Stock: {product.quantity}</span>
        </div>
        <div className="flex flex-row justify-between items-center gap-2 w-full ">
          <div className="flex flex-row justify-center sm:gap-2 gap-1 items-center">
          <button
            onClick={() => {
              if (!isAdded(product._id)) {
                addToCart(product);
                showAlert("product added to cart", "success");
              } else {
                removeItem(product);
                showAlert("product removed from cart", "success");
              }
            }}
            className="-1 text-center md:text-lg text-xs rounded-md text-white"
          >
            {!isAdded(product._id) ? (
              <i className="text-blue-500 hover:text-blue-500/70 fa-solid fa-cart-shopping" />
            ) : (
              <i className="text-green-500 hover:text-green-500/70 fa-solid fa-cart-shopping" />
            )}
          </button>
            <button className="p-2 bg-blue-400 hover:bg-blue-400/70 text-white font-semibol font-sans">
              buy
            </button>
          </div>
          <button className="p-2">
            <i className="text-xl hover:text-red-500/70 text-red-500 fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchProductCard;
