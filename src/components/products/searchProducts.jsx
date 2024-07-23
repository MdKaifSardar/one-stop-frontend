import React, { useEffect } from "react";
import { useContext } from "react";
import SearchContext from "../../context/searchContext";

const SearchProducts = () => {
  const context = useContext(SearchContext);
  const { searchProducts, setKeyword, keyword } = context;
  return (
    <form
      className="p-2 flex flex-row w-fit items-center h-fit"
      onSubmit={searchProducts}
    >
      <div className="flex felx-row justify-center items-center">
        <input
          className="border-1 border-blue-500/70 h-full p-2 text-md font-sans font-thin text-black rounded-l-full"
          value={keyword}
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search Products"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>
      <div className="flex felx-row justify-center items-center h-full w-fit">
        <button
          className="px-4 py-2 rounded-r-full bg-blue-500 text-white font-semibold"
          type="submit"
        >
          <i className="fa-solid fa-magnifying-glass"/>
        </button>
      </div>
    </form>
  );
};

export default SearchProducts;
