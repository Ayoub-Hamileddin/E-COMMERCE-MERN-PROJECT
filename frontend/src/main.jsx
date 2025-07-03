import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/user/Profile.jsx";
import Admin from "./pages/admin/Admin.jsx";
import UserList from "./pages/admin/UserList.jsx";
import CategoryList from "./pages/admin/CategoryList.jsx";
import ProductList from "./pages/admin/ProductList.jsx";
import UpdateProduct from "./pages/admin/UpdateProduct.jsx";
import AllProductList from "./pages/admin/AllProductList.jsx";
import Favorites from "./pages/Products/Favorites.jsx";
import ProductDetaills from "./pages/Products/ProductDetaills.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Shipping from "./pages/Order/Shipping.jsx";
import PlaceOrder from "./pages/Order/PlaceOrder.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetaills />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
      </Route>

      {/* admin routes */}
      <Route path="/admin" element={<Admin />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:_id" element={<UpdateProduct />} />
        <Route path="allproductslist" element={<AllProductList />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
