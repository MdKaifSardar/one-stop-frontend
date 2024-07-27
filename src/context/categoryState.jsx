import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryContext from "./categoryContext";

const CategoryState = (props) => {
  const [categories, setCategories] = useState([]);
  const [updateCategory, setUpdateCategory] = useState({ name: "", slug: "" });
  const [createdCat, setCreatedCat] = useState({ name: "", slug: "" });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user-id");
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [searchName, setSearchName] = useState("");

  const findCategory = (e) => {
    e.preventDefault();
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === searchName.toLowerCase()
    );
    setSearchName("");
    setCategories([category]);
  };

  const createCategory = async (e) => {
    e.preventDefault();
    const { name } = createdCat;
    const catData = new FormData();
    catData.append("name", name);
    catData.append("userId", userId);
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/category/create-category`,
        {
          method: "POST",
          headers: {
            authorisation: token,
          },
          body: catData,
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        props.showAlert(json.message, "success");
      } else {
        props.showAlert(json.message, "danger");
      }
      showAllCategory();
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Something went wrong while creating the category.");
    }
  };

  const showAllCategory = async () => {
    try {
      const response = await fetch(
        "/api/v1/category/all-category",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setCategories(json.category);
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("danger", "Somethin wrong happened");
    }
  };

  const editCategory = async (e) => {
    e.preventDefault();
    const { name, slug } = updateCategory;
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/category/update-category/${selectedCatId}`,
        {
          method: "PUT",
          headers: {
            authorisation: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, slug, userId }),
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        props.showAlert(json.message, "success");
      } else {
        props.showAlert(json.message, "danger");
      }
      showAllCategory();
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert(
        "danger",
        "Sometihng wrong happened while updating category"
      );
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `/api/v1/category/delete-category/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorisation: token,
          },
          body: JSON.stringify({ userId }),
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        props.showAlert(json.message, "success");
      } else {
        props.showAlert(json.message, "danger");
      }
      showAllCategory();
    } catch (error) {
      props.setIsLoading(false);
      console.log(error);
      props.showAlert(
        "danger",
        "Oops, Somethin gwrong happened while deleting the categroy"
      );
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        createdCat,
        setCreatedCat,
        selectedCatId,
        setSelectedCatId,
        deleteCategory,
        showAllCategory,
        categories,
        editCategory,
        updateCategory,
        createCategory,
        searchName,
        setSearchName,
        findCategory,
        setUpdateCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
