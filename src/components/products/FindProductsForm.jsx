import React, { useEffect } from "react";
import { useContext } from "react";
import { Select } from "antd";
import SearchContext from "../../context/searchContext";
import ProductContext from "../../context/productContext";
const { Option } = Select;

const FindProductsForm = () => {
  const searchContext = useContext(SearchContext);
  const productContext = useContext(ProductContext);
  const { setCat, searchProducts, keyword, setKeyword } = searchContext;
  const { categories, showAllCategory } = productContext;

  const handleSubmit = (e) => {
    e.preventDefault();
    searchProducts();
  };

  useEffect(() => {
    showAllCategory();
  }, []);
  return (
    <div className="flex flex-col justify-center p-3 shadow-md bg-slate-300/10 w-full h-fit">
      <form
        onSubmit={handleSubmit}
        className="gap-3 w-fit flex md:flex-row flex-col md:justify-start md:items-center justify-center h-fit "
      >
        <Select
          id="category"
          className="w-full"
          showSearch
          size="large"
          onChange={(value) => setCat(value)}
          placeholder="Select Category"
        >
          <Option value="all">All Category</Option>
          {categories && categories.length
            ? categories.map((cat, index) => (
                <Option key={index} value={cat._id}>
                  {cat.name}
                </Option>
              ))
            : null}
        </Select>
        <div className="flex flex-col gap-1 w-full">
          <input
            name="name"
            type="text"
            id="name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="form-control"
            placeholder="Enter Product Name"
          />
        </div>
        <button
          type="submit"
          className="p-2 h-8 w-8 hover:bg-blue-500/70 bg-blue-500 text-white shadow-md rounded-full flex flex-ro justify-center items-center text-center"
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </form>
    </div>
  );
};

export default FindProductsForm;
