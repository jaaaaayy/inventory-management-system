import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Categories from "./features/category/pages/categories";
import Dashboard from "./features/dashboard/pages/dashboard";
import Products from "./features/products/pages/products";
import AppLayout from "./layouts/app-layout";
import Vendors from "./features/vendors/pages/vendors";
import CreateCategory from "./features/category/pages/create-category";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/new" element={<CreateCategory />} />
          <Route path="/vendors" element={<Vendors />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
