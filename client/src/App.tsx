import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Categories from "./features/categories/pages/categories";
import Dashboard from "./features/dashboard/pages/dashboard";
import Products from "./features/products/pages/products";
import AppLayout from "./layouts/app-layout";
import Vendors from "./features/vendors/pages/vendors";
import CreateCategory from "./features/categories/pages/create-category";
import EditCategory from "./features/categories/pages/edit-category";
import CreateVendor from "./features/vendors/pages/create-vendor";
import ViewCategory from "./features/categories/pages/view-category";
import EditVendor from "./features/vendors/pages/edit-vendor";
import ViewVendor from "./features/vendors/pages/view-vendor";
import Customers from "./features/customers/pages/customers";
import CreateCustomer from "./features/customers/pages/create-customer";
import ViewCustomer from "./features/customers/pages/view-customer";
import EditCustomer from "./features/customers/pages/edit-customer";
import CreateProduct from "./features/products/pages/create-product";
import EditProduct from "./features/products/pages/edit-product";
import SalesOrders from "./features/sales-orders/pages/sales-orders";
import ViewProduct from "./features/products/pages/view-product";
import CreateSalesOrder from "./features/sales-orders/pages/create-sales-order";
import ViewSalesOrder from "./features/sales-orders/pages/view-sales-order";
import PurchaseOrders from "./features/purchase-orders/pages/purchase-orders";
import CreatePurchaseOrder from "./features/purchase-orders/pages/create-purchase-order";
import ViewPurchaseOrder from "./features/purchase-orders/pages/view-purchase-order";
import ProtectedRoute from "./routes/protected-route";
import PublicRoute from "./routes/public-route";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ViewProduct />} />
            <Route path="/products/new" element={<CreateProduct />} />
            <Route path="/products/:id/edit" element={<EditProduct />} />
            <Route path="/sales/customers" element={<Customers />} />
            <Route path="/sales/customers/:id" element={<ViewCustomer />} />
            <Route path="/sales/customers/new" element={<CreateCustomer />} />
            <Route
              path="/sales/customers/:id/edit"
              element={<EditCustomer />}
            />
            <Route path="/sales/orders" element={<SalesOrders />} />
            <Route path="/sales/orders/new" element={<CreateSalesOrder />} />
            <Route path="/sales/orders/:id" element={<ViewSalesOrder />} />
            <Route path="/purchase/orders" element={<PurchaseOrders />} />
            <Route
              path="/purchase/orders/new"
              element={<CreatePurchaseOrder />}
            />
            <Route
              path="/purchase/orders/:id"
              element={<ViewPurchaseOrder />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/new" element={<CreateCategory />} />
            <Route path="/categories/:id" element={<ViewCategory />} />
            <Route path="/categories/:id/edit" element={<EditCategory />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/new" element={<CreateVendor />} />
            <Route path="/vendors/:id" element={<ViewVendor />} />
            <Route path="/vendors/:id/edit" element={<EditVendor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
