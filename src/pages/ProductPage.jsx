import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../context/productContext";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const context = useContext(ProductContext);
  const { getProduct, product, simmilarProducts, getSimilarProducts } = context;

  useEffect(() => {
    getProduct(params.slug);
  }, []);
  return (
    <div className="mt-[75px] flex flex-col w-full h-fit justify-start items-start gap-10 p-4">
      <div className="flex flex-row w-full h-[70vh] gap-4">
        <div className="w-1/2 flex flex-col justify-center items-center h-full">
          <img
            className="h-full"
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col justify-start items-start h-fit w-fit gap-2">
            <div className="flex flex-col">
              <span className="md:font-normal font-semibold md:text-3xl text-2xl font-sans">
                {product.name}
              </span>
              <span>{product.description}</span>
            </div>
            <div className="flex flex-col">
              <span className="md:text-xl text-md font-semibold font-sans">
                Price: $ {product.price}
              </span>
              <span className="font-sans">In Stock: {product.quantity}</span>
              {/* <span className="font-sans">Product Category: {product.category}</span> */}
            </div>
          </div>
          <div className=" flex flex-row justify-between h-fit w-full">
            <div className="flex flex-row gap-2">
              <button className="p-2 hover:bg-blue-500/70 bg-blue-500 text-white font-sans">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button className="p-2 hover:bg-blue-500/70 bg-blue-500 text-white font-sans">
                Buy
              </button>
            </div>
            <button className="font-sans text-2xl">
              <i className="fa-solid fa-heart hover:text-red-500/70 text-red-500"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-fit w-full">
        <span className="sm:text-2xl text-lg text-semibold">
          Simillar products:
        </span>
        <div className="flex flex-row w-full gap-2">
          {simmilarProducts && simmilarProducts.length ? (
            simmilarProducts.map((pro, index) => (
              <div
                key={index}
                className="flex flex-row h-fit w-fit items-center shadow-md rounded-md gap-2 p-2"
              >
                <img
                  className="h-[15vh] bg-blue-500"
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  alt={pro.name}
                />
                <div className="flex flex-col justify-between items-center h-full gap-3">
                  <div className="flex flex-col justify-center">
                    <Link target="_parent" to={`/product/${pro.slug}`}>
                      <span className="sm:text-lg text-sm font-semibold font-sans">
                        {pro.name}
                      </span>
                    </Link>
                    <span className="text-sm ">{pro.description}</span>
                    <span className="text-sm font-semibold">
                      Price - $ {pro.price}
                    </span>
                  </div>
                  <div className="flex flex-row gap-1 w-full justify-end">
                    <button className="sm:text-md text-sm p-2 shadow-md rounded-md hover:bg-blue-500/70 bg-blue-500 text-white font-sans font-semibold">
                      cart
                    </button>
                    <button className="sm:text-md text-sm p-2 shadow-md rounded-md hover:bg-blue-500/70 bg-blue-500 text-white font-sans font-semibold">
                      buy
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No simmilar products to show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
