import { useEffect, useState } from "react";
import CartContext from "./cartContext";

const CartState = (props) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    countTotalPrice();
  }, [cart]);
  useEffect(() => {
    const temp = localStorage.getItem("cart");
    if (temp) {
      setCart(JSON.parse(temp));
    }
  }, []);

  const countTotalPrice = () => {
    let sum = 0;
    sum = cart.reduce((total, product) => {
      return total + product.price;
    }, 0);
    setTotalPrice(sum);
    localStorage.setItem("totalPrice", sum);
  };

  const addToCart = (product) => {
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    setCart([...cart, product]);
  };

  const removeItem = (item) => {
    const temp = cart.filter((pro) => pro._id !== item._id);
    localStorage.setItem("cart", JSON.stringify(temp));
    setCart(temp);
  };

  const isAdded = (id) => {
    if (cart.find((item) => item._id === id)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <CartContext.Provider
      value={{
        isAdded,
        addToCart,
        cart,
        setCart,
        removeItem,
        totalPrice,
        setTotalPrice,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
