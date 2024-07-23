import React from "react";
import { useContext } from "react";
import CategoryContext from "../../context/categoryContext";

const CreateCategoryForm = () => {
  const context = useContext(CategoryContext);
  const { createdCat, setCreatedCat, createCategory } = context;
  const { name } = createdCat;
  return (
    <div className="flex flex-col h-fit">
      <form
        onSubmit={createCategory}
        className="gap-2 shadow-md flex flex-col justify-center p-3"
      >
        <div className="sm:text-xl text-sm font-semibold font-sans ">
          Create new category
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-slate-500/50">Enter Category Name</label>
          <input
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setCreatedCat({
                name: e.target.value,
              });
            }}
            className="form-control"
            required
            placeholder="Enter Category Name"
          />
        </div>
        <div className="w-fit flex flex-row justify-center items-center">
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white shadow-md"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
