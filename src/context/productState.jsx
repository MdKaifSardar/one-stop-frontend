import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductContext from "./productContext";

const ProductState = (props) => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [simmilarProducts, setSimmilarProducts] = useState([]);
  // const [productSlug, setProductSlug] = useState("");
  const [limit, setLimit] = useState(12);
  const navigate = useNavigate();
  const userId = localStorage.getItem("user-id");
  const token = localStorage.getItem("token");
  const [selectCat, setSelectCat] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProId, setSelectedProId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProd, setTotalProd] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [createProduct, setCreateProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    photo: "",
    shipping: "",
  });
  const [editProduct, setEditProduct] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    category: "",
    photo: "",
    shipping: "",
  });
  const [findProduct, setFindProduct] = useState({
    categoryId: "",
    productName: "",
  });

  const { categoryId, productName } = findProduct;
  const [previews, setPreviews] = useState([]);

  const getSimilarProducts = async (pId, cId) => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/similar-products/${pId}/${cId}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setSimmilarProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("something went wrong", "danger");
    }
  };
  const getProduct = async (slug) => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/single-product/${slug}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setProduct(json.product);
        getSimilarProducts(json.product._id, json.product.category._id);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("Something went wrong while viewing the product");
    }
  };

  const showFirstPage = async () => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/products-by-page?page=1&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setTotalPages(json.totalPages);
        props.setProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("Error while loading page");
    }
  };

  //all products:
  const ShowAllProducts = async () => {
    try {
      props.setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/v1/product/all-product",
        {
          method: "GET",
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setAllProducts(json.products);
        props.setProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Somethin went wrong", "success");
    }
  };

  //next page:
  const nextPage = async () => {
    if (currentPage === totalPages) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/products-by-page?page=${2}&limit=${limit}`,
        {
          method: "GET",
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setCurrentPage(json.currentPage);
        props.setProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("Error while loading new page");
    }
  };

  //prev page:
  const prevPage = async () => {
    if (currentPage == 1) {
      return;
    }
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/products-by-page?page=${1}&limit=${limit}`,
        {
          method: "GET",
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        setCurrentPage(json.currentPage);
        props.setProducts(json.products);
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.showAlert("Error while loading new page");
    }
  };
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEditProduct((prev) => ({
      ...prev,
      photo: files[0],
    }));

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const onChangeEdit = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };
  const editProductFunction = async (e) => {
    e.preventDefault();
    const { name, description, category, photo, shipping, quantity, price } =
      editProduct;
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("description", description);
    productData.append("category", category);
    if (photo !== "") {
      productData.append("photo", photo);
    }
    productData.append("shipping", shipping);
    productData.append("quantity", quantity);
    productData.append("price", price);
    try {
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/update-product/${selectedProId}`,
        {
          method: "PUT",
          body: productData,
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        props.showAlert(json.message, "success");
        setEditProduct({});
        setPreviews([]);
        navigate("/dashboard/admin/show-product");
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Something went wrong", "danger");
    }
  };
  const deleteProduct = async (productId) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this product"
      );
      if (answer !== "yes") return;
      props.setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/v1/product/delete-product/${productId}`,
        {
          method: "DELETE",
        }
      );

      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        props.showAlert(json.message, "success");
        ShowAllProducts();
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert("Something went wrong", "danger");
    }
  };
  const findProductsByCatFunction = (e) => {
    e.preventDefault();
    const foundProducts = allProducts.filter(
      (pro) =>
        (!(categoryId == "all") ? pro.category === categoryId : true) &&
        (!(productName == "")
          ? pro.name.toLowerCase() === productName.toLowerCase()
          : true)
    );
    props.setProducts(foundProducts);
  };

  const onChange = (e) => {
    setCreateProduct({
      ...createProduct,
      [e.target.name]: e.target.value,
    });
  };
  const showAllCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/category/all-category",
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setCategories(json.category);
    } catch (error) {
      console.log(error);
      props.showAlert("danger", "Somethin wrong happened");
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const { name, category, shipping, quantity, photo, price, description } =
      createProduct;
    const productData = new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("category", category);
    productData.append("shipping", shipping);
    productData.append("quantity", quantity);
    productData.append("photo", photo);
    productData.append("price", price);
    productData.append("userId", userId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/product/create-product`,
        {
          method: "POST",
          headers: {
            authorisation: token,
          },
          body: productData,
        }
      );
      const json = await response.json();
      props.setIsLoading(false);
      if (json.success) {
        props.showAlert(json.message, "success");
      } else {
        props.showAlert(json.message, "danger");
      }
    } catch (error) {
      console.log(error);
      props.setIsLoading(false);
      props.showAlert(error, "danger");
    }
  };
  return (
    <ProductContext.Provider
      value={{
        getSimilarProducts,
        simmilarProducts,
        product,
        currentPage,
        showFirstPage,
        nextPage,
        prevPage,
        onChangeEdit,
        selectedProId,
        setSelectedProId,
        editProduct,
        setEditProduct,
        findProduct,
        setFindProduct,
        onChange,
        createProduct,
        setCreateProduct,
        handleCreateProduct,
        showAllCategory,
        categories,
        ShowAllProducts,
        selectCat,
        setSelectCat,
        findProductsByCatFunction,
        allProducts,
        setAllProducts,
        deleteProduct,
        editProductFunction,
        handleFileChange,
        previews,
        totalPages,
        getProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
