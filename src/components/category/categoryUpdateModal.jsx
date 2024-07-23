import React from "react";
import { useContext } from "react";
import CategoryContext from "../../context/categoryContext";

const CategoryUpdateModal = () => {
  const context = useContext(CategoryContext);
  const { editCategory, setUpdateCategory, updateCategory } = context;
  return (
    <>
      <button className="hidden" />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content w-fit mx-auto px-4">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="flex flex-col">
              <form
                onSubmit={editCategory}
                className="w-fit flex flex-col gap-3 justify-center items-center p-2"
              >
                <div>
                  <label htmlFor="name">Enter New Category Name</label>
                  <input
                    name="name"
                    type="text"
                    id="name"
                    value={updateCategory.name}
                    onChange={(e) => setUpdateCategory({
                      name: e.target.value
                    })}
                    className="form-control"
                    required
                    placeholder="Enter Category Name"
                  />
                </div>
                <div className="ml-auto flex flex-row gap-2 justify-end items-center">
                  <button
                    type="submit"
                    className="p-2 rounded-md bg-blue-500 text-white shadow-md"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    className="p-2 rounded-md bg-red-500 text-white shadow-md"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryUpdateModal;
