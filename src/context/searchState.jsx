import { useState } from "react";
import SearchContext from "./searchContext";
import { useNavigate } from "react-router-dom";

const SearchState = (props) => {
  const navigate = useNavigate();
  const [price, setPrice] = useState([1, 9999]);
  const [keyword, setKeyword] = useState("");
  const [foundProd, setFoundProd] = useState([]);
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const prevPage = async () => {
    if (currentPage == 1) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/search-product/${keyword}?page=${
          currentPage - 1
        }&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
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
        `http://localhost:8080/api/v1/product/search-product/${keyword}?page=${
          currentPage + 1
        }&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
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
      props.showAlert("Error while loading new page");
    }
  };
  const filterProducts = async () => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/search-product/${keyword}?page=1&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
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
      props.showAlert("Could not filter", "danger");
    }
  };

  const searchProducts = async (e) => {
    e.preventDefault();
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/search-product/${keyword}?page=1&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalPages(json.totalPages);
        setCurrentPage(json.currentPage);
        setFoundProd(json.products);
        navigate("/search-products");
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("Somethin wrong happene while searching", "danger");
    }
  };
  return (
    <SearchContext.Provider
      value={{
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
        filterProducts
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchState;
