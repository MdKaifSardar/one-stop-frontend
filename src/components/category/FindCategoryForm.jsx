import React from "react";
import { useContext } from "react";
import CategoryContext from "../../context/categoryContext";

const FindCategoryForm = () => {
  const context = useContext(CategoryContext);
  const { showAllCategory, findCategory, searchName, setSearchName } = context;
  return (
    <div className="flex flex-col h-fit">
      <form
        onSubmit={findCategory}
        className="gap-2 shadow-md flex flex-col justify-center p-3"
      >
        <div className="sm:text-xl text-sm font-semibold font-sans ">
          Search category
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-slate-500/50">Enter Category Name</label>
          <input
            name="name"
            type="text"
            id="name"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
            }}
            className="form-control"
            required
            placeholder="Enter Category Name"
          />
        </div>
        <div className="gap-2 w-fit flex flex-row justify-center items-center">
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white shadow-md"
          >
            Search
          </button>
          <button
            onClick={showAllCategory}
            className="p-2 rounded-md bg-red-500 text-white shadow-md"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FindCategoryForm;
