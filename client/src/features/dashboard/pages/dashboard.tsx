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
import { useFetchPurchaseOrderList } from "@/features/purchase-orders/services/queries";
import { formatCurrency } from "@/lib/utils";
import { RevenueChart } from "../components/revenue-chart";
import { StatusChart } from "../components/status-chart";
import { PurchaseStatusChart } from "../components/purchase-status-chart";
import { RecentSalesOrders } from "../components/recent-sales";
import { RecentPurchaseOrders } from "../components/recent-purchases";
import { RecentStockMovements } from "../components/recent-stock-movements";
import { LowStockAlerts } from "../components/low-stock-alerts";
import { TSalesOrder } from "@/features/sales-orders/types";
import { TProduct } from "@/features/products/types";
import { TPurchaseOrder } from "@/features/purchase-orders/types";

import {
  Banknote,
  Boxes,
  ClipboardList,
  Package,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";

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
    isLoading: purchaseOrderIsLoading,
    isError: purchaseOrderIsError,
    error: purchaseOrderError,
    data: purchaseOrderData,
  } = useFetchPurchaseOrderList();

  if (
    (salesOrderIsError && salesOrderError) ||
    (productIsError && productError) ||
    (purchaseOrderIsError && purchaseOrderError)
  ) {
    return <Error message="Something went wrong!" />;
  }

  if (
    salesOrderIsLoading ||
    productIsLoading ||
    purchaseOrderIsLoading ||
    !salesOrderData ||
    !productData ||
    !purchaseOrderData
  ) {
    return <Loading feature="dashboard" />;
  }

  const salesOrders: TSalesOrder[] = salesOrderData.salesOrders;
  const products: TProduct[] = productData.products;
  const purchaseOrders: TPurchaseOrder[] = purchaseOrderData.purchaseOrders;

  // Calculate Metrics
  const totalRevenue = salesOrders.reduce(
    (acc: number, order: TSalesOrder) =>
      order.status === "Cancelled"
        ? acc
        : acc + parseFloat(order.totalAmount || "0"),
    0
  );

  const inventoryValue = products.reduce(
    (acc: number, product: TProduct) =>
      acc + Number(product.costPrice ?? 0) * (product.quantity || 0),
    0
  );

  const itemsInStock = products.reduce(
    (acc: number, product: TProduct) => acc + (product.quantity || 0),
    0
  );

  const pendingOrders = salesOrders.filter(
    (order) => order.status === "Pending"
  ).length;

  const pendingPurchases = purchaseOrders.filter(
    (order) => order.status === "Pending"
  ).length;

  const lowStockCount = products.filter(
    (product) => Number(product.quantity) <= Number(product.reorderPoint)
  ).length;

  const totals = [
    {
      title: "Total Revenue",
      amount: formatCurrency(totalRevenue),
      icon: Banknote,
    },
    {
      title: "Inventory Value",
      amount: formatCurrency(inventoryValue),
      icon: Package,
    },
    {
      title: "Items in Stock",
      amount: itemsInStock.toLocaleString(),
      icon: Boxes,
    },
    {
      title: "Pending Orders",
      amount: pendingOrders.toLocaleString(),
      icon: ClipboardList,
    },
    {
      title: "Pending Purchases",
      amount: pendingPurchases.toLocaleString(),
      icon: ShoppingBag,
    },
    {
      title: "Low Stock",
      amount: lowStockCount.toLocaleString(),
      icon: TriangleAlert,
    },
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
          <RevenueChart salesOrders={salesOrders} />
          <StatusChart salesOrders={salesOrders} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PurchaseStatusChart purchaseOrders={purchaseOrders} />
          <RecentPurchaseOrders purchaseOrders={purchaseOrders} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentSalesOrders salesOrders={salesOrders} />
          <LowStockAlerts products={products} />
        </div>

        <RecentStockMovements />
      </div>
    </>
  );
};

export default Dashboard;
