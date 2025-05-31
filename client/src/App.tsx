import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Dashboard from "./features/dashboard/pages/dashboard";
import Products from "./features/products/pages/products";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
