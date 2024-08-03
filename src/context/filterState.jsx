import { useState } from "react";
import FilterContext from "./filterContext";

const FilterState = (props) => {
  const [cat, setCat] = useState([]);
  const [catName, setCatName] = useState([]);
  const [price, setPrice] = useState([1, 9999]);
  const [priceName, setPriceName] = useState("");
  const [limit, setLimit] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleChangeCat = (value, id, name) => {
    let all = [...cat];
    let allName = [...catName];
    if (value) {
      all.push(id);
      allName.push(name);
    } else {
      all = all.filter((c) => c !== id);
      allName = allName.filter((c) => c !== name);
    }
    setCat(all);
    setCatName(allName);
  };

  const handleFilterProducts = async () => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/product/products-by-page?page=1&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cat, price }),
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setCurrentPage(json.currentPage);
        setTotalPages(json.totalPages);
        props.setProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert(
        "Something went wrong while filtering products",
        "danger"
      );
    }
  };

  const prevPage = async () => {
    if (currentPage == 1) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/product/products-by-page?page=${currentPage - 1}&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cat, price }),
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalPages(json.totalPages);
        setCurrentPage(json.currentPage);
        props.setProducts(json.products);
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
        `/api/v1/product/products-by-page?page=${currentPage + 1}&limit=${limit}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cat, price }),
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalPages(json.totalPages);
        setCurrentPage(json.currentPage);
        props.setProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Error while loading new page");
    }
  };
  return (
    <FilterContext.Provider
      value={{
        totalPages,
        currentPage,
        nextPage,
        prevPage,
        priceName,
        setPriceName,
        price,
        cat,
        handleChangeCat,
        handleFilterProducts,
        catName,
        setPrice,
        setCat,
      }}
    >
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterState;
