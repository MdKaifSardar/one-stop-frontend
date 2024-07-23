import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../../context/cartContext";

const MainProductCard = ({ product, showAlert }) => {
  const context = useContext(CartContext);
  const { isAdded, addToCart, removeItem } = context;
  return (
    <div className="rounded-lg shadow flex flex-col bg-slate-300/20 justify-between items-center p-3 gap-3">
      <div className="flex flex-col justify-center h-full">
        <img
          src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="w-full"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col bg-slate-400/10">
          <Link to={`/product/${product.slug}`}>
            <span className="md:text-lg text-sm">{product.name}</span>
          </Link>
          <span className="md:text-lg text-sm">
            {product.description.substring(0, 30)}...
          </span>
          <span className="md:text-lg text-sm">$ {product.price}</span>
        </div>
        <div className="flex flex-row justify-end items-center gap-2">
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
          <button className="p-1 md:text-lg hover:bg-blue-500/70 text-xs bg-blue-500 rounded-md text-white">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainProductCard;
