import { useState } from "react";
import SearchContext from "./searchContext";
import { useNavigate, useLocation } from "react-router-dom";

const SearchState = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [price, setPrice] = useState([1, 9999]);
  const [cat, setCat] = useState("");
  const [keyword, setKeyword] = useState("");
  const [foundProd, setFoundProd] = useState([]);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const prevPage = async () => {
    if (currentPage == 1) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/product/search-product/${keyword}?page=${
          currentPage - 1
        }&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price, cat }),
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalPages(json.totalPages);
        setCurrentPage(json.currentPage);
        setFoundProd(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Error while loading new page");
    }
  };
  const nextPage = async () => {
    if (currentPage === totalPages) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/product/search-product/${keyword}?page=${
          currentPage + 1
        }&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price, cat }),
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalPages(json.totalPages);
        setCurrentPage(json.currentPage);
        setFoundProd(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Error while loading new page");
    }
  };

  const searchProducts = async () => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/product/search-product/${keyword}?page=1&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price, cat }),
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalProducts(json.totalProducts);
        setTotalPages(json.totalPages);
        setCurrentPage(json.currentPage);
        setFoundProd(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Somethin wrong happene while searching", "danger");
    }
  };
  return (
    <SearchContext.Provider
      value={{
        totalProducts,
        cat,
        setCat,
        setPrice,
        currentPage,
        totalPages,
        keyword,
        setKeyword,
        searchProducts,
        foundProd,
        nextPage,
        prevPage,
        price,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
