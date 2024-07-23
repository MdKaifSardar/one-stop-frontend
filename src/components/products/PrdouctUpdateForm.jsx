import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../../context/productContext";
import { Select } from "antd";
const { Option } = Select;

const PrdouctUpdateForm = () => {
  const context = useContext(ProductContext);
  const {
    previews,
    onChangeEdit,
    categories,
    showAllCategory,
    editProductFunction,
    editProduct,
    setEditProduct,
    handleFileChange,
  } = context;
  const { name, description, quantity, price, category, shipping, photo } =
    editProduct;
  useEffect(() => {
    showAllCategory();
  }, []);
  return (
    <div className="flex flex-col w-full">
      <form
        onSubmit={editProductFunction}
        className="gap-2 shadow-md flex flex-col justify-center items-center p-3 w-full"
      >
        <div className="sm:text-xl text-md font-semibold font-sans ">
          Update Product
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="category" className="text-slate-500/50">
            Category:
          </label>
          <Select
            value={category}
            className="mb-3"
            showSearch
            size="large"
            onChange={(value) =>
              setEditProduct({
                ...editProduct,
                category: value,
              })
            }
          >
            {categories.map((cat, index) => (
              <Option key={index} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="name" className="text-slate-500/50">
            Name:
          </label>
          <input
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={onChangeEdit}
            className="form-control"
            required
            placeholder="Enter Product Name"
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="description" className="text-slate-500/50">
            Description:
          </label>
          <input
            name="description"
            type="text"
            id="description"
            value={description}
            onChange={onChangeEdit}
            className="form-control"
            required
            placeholder="Enter description"
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="quantity" className="text-slate-500/50">
            Quantity:
          </label>
          <input
            name="quantity"
            type="number"
            id="quantity"
            value={quantity}
            onChange={onChangeEdit}
            className="form-control"
            required
            placeholder="Enter Quantity"
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="price" className="text-slate-500/50">
            Price:
          </label>
          <input
            name="price"
            type="number"
            id="price"
            value={price}
            onChange={onChangeEdit}
            className="form-control"
            required
            placeholder="Enter Category Name"
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="shipping" className="text-slate-500/50">
            Shipping:
          </label>
          <Select
            value={shipping}
            placeholder="select shipping"
            showSearch
            size="large"
            onChange={(value) =>
              setEditProduct({
                ...editProduct,
                shipping: value,
              })
            }
          >
            <Option value="1">Yes</Option>
            <Option value="0">No</Option>
          </Select>
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <label htmlFor="photo" className="text-slate-500/50">
            Photo:
          </label>
          <input
            name="photo"
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="form-control"
            placeholder="photo"
          />
        </div>
        <div className="flex flex-col justify-center items-center w-1/2">
          {photo ? (
            previews.map((pre, index) => (
              <img key={index} className="w-1/2" src={pre} alt="image prev" />
            ))
          ) : (
            <img
              className="w-1/2"
              src={`http://localhost:8080/api/v1/product/product-photo/${editProduct._id}`}
            ></img>
          )}
        </div>
        <div className="gap-2 w-fit flex flex-row justify-center items-center">
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 text-white shadow-md"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrdouctUpdateForm;
