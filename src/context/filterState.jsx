import { useState } from "react";
import FilterContext from "./filterContext";
import { useContext } from "react";
import ProductContext from "./productContext";

const FilterState = (props) => {
  const [cat, setCat] = useState([]);
  const [catName, setCatName] = useState([]);
  const [price, setPrice] = useState([]);
  const [priceName, setPriceName] = useState("");

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
    // all.push(id);
    setCat(all);
    setCatName(allName);
  };

  const handleFilterProducts = async () => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/product/filter-product`,
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
  return (
    <FilterContext.Provider
      value={{
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
