import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import TotalCardList from "../components/total-card-list";
import Loading from "@/components/loading";
import { useFetchSalesOrderList } from "@/features/sales-orders/services/queries";
import Error from "@/components/error";
import { useFetchProductList } from "@/features/products/services/queries";
import { useFetchCustomerList } from "@/features/customers/services/queries";
import { useFetchVendorList } from "@/features/vendors/services/queries";
import { formatCurrency } from "@/lib/utils";
import { RevenueChart } from "../components/revenue-chart";
import { StatusChart } from "../components/status-chart";
import { RecentSalesOrders } from "../components/recent-sales";
import { LowStockAlerts } from "../components/low-stock-alerts";
import { TSalesOrder } from "@/features/sales-orders/types";
import { TProduct } from "@/features/products/types";

import { Banknote, Boxes, Package, Users } from "lucide-react";

const Dashboard = () => {
  const {
    isLoading: salesOrderIsLoading,
    isError: salesOrderIsError,
    error: salesOrderError,
    data: salesOrderData,
  } = useFetchSalesOrderList();
  const {
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
    data: productData,
  } = useFetchProductList();
  const {
    isLoading: customerIsLoading,
    isError: customerIsError,
    error: customerError,
    data: customerData,
  } = useFetchCustomerList();
  const {
    isLoading: vendorIsLoading,
    isError: vendorIsError,
    error: vendorError,
    data: vendorData,
  } = useFetchVendorList();

  if (
    (salesOrderIsError && salesOrderError) ||
    (productIsError && productError) ||
    (customerIsError && customerError) ||
    (vendorIsError && vendorError)
  ) {
    return <Error message="Something went wrong!" />;
  }

  if (
    salesOrderIsLoading ||
    productIsLoading ||
    customerIsLoading ||
    vendorIsLoading ||
    !salesOrderData || !productData || !customerData || !vendorData
  ) {
    return <Loading feature="dashboard" />;
  }

  // Calculate Metrics
  const totalRevenue = salesOrderData.salesOrders.reduce(
    (acc: number, order: TSalesOrder) => acc + parseFloat(order.totalAmount || "0"),
    0
  );

  const inventoryValue = productData.products.reduce(
    (acc: number, product: TProduct) => acc + (parseFloat(product.costPrice?.toString() || "0") * (product.quantity || 0)),
    0
  );

  const itemsInStock = productData.products.reduce(
    (acc: number, product: TProduct) => acc + (product.quantity || 0),
    0
  );

  const activeNetwork = customerData.customers.length + vendorData.vendors.length;

  const totals = [
    { title: "Total Revenue", amount: formatCurrency(totalRevenue), icon: Banknote },
    { title: "Inventory Value", amount: formatCurrency(inventoryValue), icon: Package },
    { title: "Items in Stock", amount: itemsInStock.toLocaleString(), icon: Boxes },
    { title: "Active Contacts", amount: activeNetwork.toLocaleString(), icon: Users },
  ];

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 flex flex-col grow space-y-6">
        <TotalCardList totals={totals} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart salesOrders={salesOrderData.salesOrders} />
          <StatusChart salesOrders={salesOrderData.salesOrders} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentSalesOrders salesOrders={salesOrderData.salesOrders} />
          <LowStockAlerts products={productData.products} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
