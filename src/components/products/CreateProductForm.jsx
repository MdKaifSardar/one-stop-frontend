import React, { useEffect } from "react";
import { useContext } from "react";
import ProductContext from "../../context/productContext";
import { Select } from "antd";
const { Option } = Select;

const CreateProductForm = () => {
  const context = useContext(ProductContext);
  const {
    setCreateProduct,
    showAllCategory,
    categories,
    handleCreateProduct,
    onChange,
    createProduct,
  } = context;
  const { name, description, price, quantity } =
    createProduct;
  useEffect(() => {
    showAllCategory();
  }, []);
  return (
    <div className="w-full flex flex-col">
      <form
        onSubmit={handleCreateProduct}
        className="gap-2 w-fit shadow-md flex flex-col justify-center p-2"
      >
        <div className="sm:text-xl text-md font-semibold font-sans ">
          Create Product
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-slate-500/50">
            Category:
          </label>
          <Select
            className="mb-3"
            showSearch
            size="large"
            onChange={(value) => {
                setCreateProduct({
                    category: value
                })
            }}
          >
            {
                categories.map((cat, index) => (
                    <Option key={index} value={cat._id}>{cat.name}</Option>
                ))
            }
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-slate-500/50">
            Name:
          </label>
          <input
            name="name"
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            className="form-control"
            required
            placeholder="Enter Product Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-slate-500/50">
            Description:
          </label>
          <input
            name="description"
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            className="form-control"
            required
            placeholder="Enter description"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="quantity" className="text-slate-500/50">
            Quantity:
          </label>
          <input
            name="quantity"
            type="number"
            id="quantity"
            value={quantity}
            onChange={onChange}
            className="form-control"
            required
            placeholder="Enter Quantity"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-slate-500/50">
            Price:
          </label>
          <input
            name="price"
            type="number"
            id="price"
            value={price}
            onChange={onChange}
            className="form-control"
            required
            placeholder="Enter Category Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="shipping" className="text-slate-500/50">
            Shipping:
          </label>
          <Select placeholder="select shipping" showSearch size="large" onChange={(value) => setCreateProduct({
            ...createProduct,
            shipping: value
          })}>
            <Option value="1">
                Yes
            </Option>
            <Option value="0">
                No
            </Option>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="photo" className="text-slate-500/50">
            Photo:
          </label>
          <input
            name="photo"
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => {
              setCreateProduct({
                ...createProduct,
                photo: e.target.files[0],
              });
            }}
            className="form-control"
            required
            placeholder="photo"
          />
        </div>
        <div className="gap-2 w-fit flex flex-row justify-center items-center">
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

export default CreateProductForm;
