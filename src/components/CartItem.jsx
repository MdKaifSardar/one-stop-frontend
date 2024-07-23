import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/cartContext";

const CartItem = ({ item }) => {
    const context = useContext(CartContext);
    const {removeItem} = context;
  return (
    <div className="rounded-lg shadow flex flex-col bg-slate-300/20 justify-between items-center p-3 gap-3 md:w-1/2 w-full">
      <div className="flex flex-col justify-center h-full">
        <img
          src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
          alt={item.name}
          className="w-full"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-col">
          <Link to={`/product/${item.slug}`}>
            <span className="hover:text-blue-500 md:text-2xl text-lg">{item.name}</span>
          </Link>
          <span className="md:text-lg text-sm">
            {item.description}...
          </span>
          <span className="md:text-lg text-sm">$ {item.price}</span>
        </div>
      </div>
      <div className="w-full flex flex-row justify-end items-center">
            <button onClick={() => removeItem(item)} className="p-2 rounded-md border-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white font-sans font-semibold ">Remove</button>
        </div>
    </div>
  );
};

export default CartItem;
