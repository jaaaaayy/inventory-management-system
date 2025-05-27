import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Products from "./features/products/pages/products";
const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/products", element: <Products /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
