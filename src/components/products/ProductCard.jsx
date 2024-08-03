import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../../context/productContext";
import { Link } from "react-router-dom";
import SearchContext from "../../context/searchContext";

const ProductCard = ({ product }) => {
  const context = useContext(ProductContext);
  const searchContext = useContext(SearchContext);
  const {
    setEditProduct,
    deleteProduct,
    setSelectedProId,
    showAllCategory,
  } = context;

  const {searchProducts} = searchContext;

  useEffect(() => {
    showAllCategory();
  }, []);
  return (
    <div className="flex md:flex-row flex-col justify-between p-2 shadow-md bg-slate-200/20 gap-2 rounded-md w-full">
      <div className="flex md:flex-row flex-col w-fit gap-3">
        <div className="p-2 flex flex-row md:w-32 justify-center items-center w-full h-full">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="md:w-full w-1/2"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex sm:text-lg text-sm flex-wrap w-fit">
            <span className="text-slate-600/70">Name: </span>
            <span>{product.name}</span>
          </div>
          <div className="flex sm:text-lg text-sm flex-wrap w-fit">
            <span className="text-slate-600/70">Description: </span>
            <span>{product.description}</span>
          </div>
          <div className="flex sm:text-lg text-sm flex-wrap w-fit">
            <span className="text-slate-600/70">Quantity: </span>
            <span>{product.quantity}</span>
          </div>
          <div className="flex sm:text-lg text-sm flex-wrap w-fit">
            <span className="text-slate-600/70">Price: </span>
            <span>{product.price}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-end justify-center w-fit gap-2">
        <Link
          onClick={() => {
            setSelectedProId(product._id);
            setEditProduct({
              ...product,
              photo: "",
            });
          }}
          className="p-2 bg-blue-500 shadow-md text-white hover:bg-blue-500/70"
          to="/dashboard/admin/product-update"
        >
          Edit
        </Link>
        <button
          onClick={() => {
            deleteProduct(product._id);
            searchProducts();
          }}
          className="p-2 bg-red-500 shadow-md text-white hover:bg-red-500/70"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
