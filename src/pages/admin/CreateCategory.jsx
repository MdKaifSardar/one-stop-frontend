import React, { useEffect } from "react";
import AdminMenu from "../../components/AdminMenu";
import AdminDetails from "../../components/AdminDetails";
import { useContext } from "react";
import CategoryContext from "../../context/categoryContext";
import CreateCategoryForm from "../../components/category/CreateCategoryForm";
import FindCategoryForm from "../../components/category/FindCategoryForm";
import CategoryUpdateModal from "../../components/category/categoryUpdateModal";

const CreateCategory = () => {
  const context = useContext(CategoryContext);
  const {
    setSelectedCatId,
    showAllCategory,
    categories,
    deleteCategory,
    setUpdateCategory
  } = context;

  useEffect(() => {
    showAllCategory();
  }, []);
  return (
    <div className="mt-24 flex flex-row w-[100%] h-fit mb-10">
      <AdminMenu />
      <div className="flex flex-col items-start w-full h-fit bg-slate-300/20">
        <AdminDetails />
        <div className="flex w-full md:flex-row flex-col p-3 gap-3">
          <CreateCategoryForm/>
          <FindCategoryForm/>
        </div>
        <div className="w-full gap-2 flex flex-col">
          {categories && categories.length ? (
            categories.map((category, index) => (
              <div
                key={index}
                className="mx-3 bg-slate-300/10 shadow-md h-fit p-2 flex flex-row justify-between items-center"
              >
                <span className="md:text-lg text-sm">
                  <span className="text-slate-600/70">Category:</span>{" "}
                  <span>{category.name}</span>
                </span>
                <div className="flex sm:flex-row flex-col h-fit gap-2 ">
                  <button
                    onClick={() => deleteCategory(category._id)}
                    className="text-white bg-red-500 p-2 shadow-md hover:bg-red-500/70 sm:text-lg text-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCatId(category._id);
                      setUpdateCategory({name: category.name});
                      }}
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    className="text-white p-2 shadow-md bg-blue-500 hover:bg-blue-500/70 sm:text-lg text-md"
                  >
                    Edit
                  </button>
                  <CategoryUpdateModal name={category.name}/>
                </div>
              </div>
            ))
          ) : (
            <p className="p-2 sm:text-xl text-md">No categories found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
