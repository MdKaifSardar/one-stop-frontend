import React, { useEffect } from "react";
import { useContext } from "react";
import CartContext from "../context/cartContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

const CartPage = ({ showAlert }) => {
  const navigate = useNavigate();
  const context = useContext(CartContext);
  const { cart, countTotalPrice, totalPrice } = context;
  useEffect(() => {
    countTotalPrice();
  }, [cart]);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);
  return (
    <div className="mb-10 p-2 mt-[75px] flex flex-col w-full justify-center items-center h-fit gap-3">
      <div className="sm:text-xl text-lg ">
        You have {cart ? cart.length : "no"} items in your cart{" "}
      </div>
      <div className=" flex flex-row w-full justify-evenly items-start gap-3">
        <div className="flex flex-col justify-center items-center w-1/2 gap-4">
          {cart && cart.length ? (
            cart.map((item, index) => <CartItem key={index} item={item} />)
          ) : (
            <div>Your cart is empty</div>
          )}
        </div>
        <div className="bg-slate-200/30 flex flex-col w-1/2 p-2 h-full shadow rounded-lg">
          <span className="flex flex-row sm:text-2xl text-lg h-full">
            check out
          </span>
          <div>
            {/* <span>Total Price: $ {localStorage.getItem("totalPrice")}</span> */}
            <span>Total Price: $ {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
