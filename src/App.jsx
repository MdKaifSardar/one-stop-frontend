import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home";
import Footer from "./components/Footer";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Contact from "./pages/Contact";
import Signup from "./pages/signup";
import AuthState from "./context/authState";
import Pagenotfound from "./pages/Pagenotfound";
import Alert from "./components/Alert";
import { useState } from "react";
import Dashboard from "./pages/user/dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPass from "./components/ForgotPass";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/Routes/Admin";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import CategoryState from "./context/categoryState";
import Loader from "./components/Loader";
import ProductState from "./context/productState";
import ShowProduct from "./components/ShowProduct";
import ProductUpdate from "./components/products/ProductUpdate";
import FilterState from "./context/filterState";
import SearchState from "./context/searchState";
import SearchProductsPage from "./pages/SearchProductsPage";
import ProductPage from "./pages/ProductPage";
import AllCategory from "./pages/AllCategory";
import Category from "./pages/Category";
import CartPage from "./pages/CartPage";
import CartState from "./context/cartState";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [products, setProducts] = useState([]);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <main className="p-0 m-0 flex flex-col items-center">
      <Router>
        <CartState showAlert={showAlert} setIsLoading={setIsLoading}>
          <SearchState showAlert={showAlert} setIsLoading={setIsLoading}>
            <ProductState
              products={products}
              setProducts={setProducts}
              showAlert={showAlert}
              setIsLoading={setIsLoading}
            >
              <FilterState
                products={products}
                setProducts={setProducts}
                showAlert={showAlert}
                setIsLoading={setIsLoading}
              >
                <CategoryState
                  showAlert={showAlert}
                  setIsLoading={setIsLoading}
                >
                  <AuthState showAlert={showAlert} setIsLoading={setIsLoading}>
                    <Navbar />
                    {isLoading && <Loader />}
                    <Alert alert={alert} />
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <Home
                            products={products}
                            showAlert={showAlert}
                            setIsLoading={setIsLoading}
                          />
                        }
                      />
                      <Route
                        path="/category/:slug"
                        element={<Category products={products} />}
                      />
                      <Route path="/all-category" element={<AllCategory />} />
                      <Route
                        path="/search-products"
                        element={<SearchProductsPage showAlert={showAlert} />}
                      />
                      <Route
                        path="/product/:slug"
                        element={
                          <ProductPage
                            showAlert={showAlert}
                            setIsLoading={setIsLoading}
                          />
                        }
                      />
                      <Route path="/cart" element={<PrivateRoute />}>
                        <Route path="user" element={<CartPage showAlert={showAlert}/>} />
                      </Route>
                      <Route path="/cart" element={<AdminRoute />}>
                        <Route path="admin" element={<CartPage showAlert={showAlert}/>} />
                      </Route>
                      <Route path="/dashboard" element={<PrivateRoute />}>
                        <Route path="user" element={<Dashboard />} />
                        <Route path="user/profile" element={<Profile />} />
                        <Route path="user/orders" element={<Orders />} />
                      </Route>
                      <Route path="/dashboard" element={<AdminRoute />}>
                        <Route path="admin" element={<AdminDashboard />} />
                        <Route
                          path="admin/create-category"
                          element={<CreateCategory />}
                        />
                        <Route
                          path="admin/create-product"
                          element={<CreateProduct />}
                        />
                        <Route
                          path="admin/show-product"
                          element={<ShowProduct />}
                        />
                        <Route
                          path="admin/product-update"
                          element={<ProductUpdate />}
                        />
                        <Route path="admin/users" element={<Users />} />
                      </Route>
                      <Route
                        path="/forgotpass"
                        element={
                          <ForgotPass
                            showAlert={showAlert}
                            setIsLoading={setIsLoading}
                          />
                        }
                      />
                      <Route path="/about" element={<About />} />
                      <Route
                        path="/contact"
                        element={
                          <Contact
                            showAlert={showAlert}
                            setIsLoading={setIsLoading}
                          />
                        }
                      />
                      <Route
                        path="/login"
                        element={
                          <Login
                            showAlert={showAlert}
                            setIsLoading={setIsLoading}
                          />
                        }
                      />
                      <Route
                        path="/signup"
                        element={
                          <Signup
                            showAlert={showAlert}
                            setIsLoading={setIsLoading}
                          />
                        }
                      />
                      <Route path="*" element={<Pagenotfound />} />
                    </Routes>
                    <Footer />
                  </AuthState>
                </CategoryState>
              </FilterState>
            </ProductState>
          </SearchState>
        </CartState>
      </Router>
    </main>
  );
};

export default App;
