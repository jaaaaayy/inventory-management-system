import PageHeader from "@/components/page-header";
import TotalCardList from "../components/total-card-list";
import DashboardSkeleton from "../components/dashboard-skeleton";
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
import { ActivityStrip } from "../components/activity-strip";
import { TopSellingProducts } from "../components/top-selling-products";
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

const DashboardContent = ({
  salesOrders,
  products,
  purchaseOrders,
}: {
  salesOrders: TSalesOrder[];
  products: TProduct[];
  purchaseOrders: TPurchaseOrder[];
}) => {
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
      subtext: "Excludes cancelled orders",
    },
    {
      title: "Inventory Value",
      amount: formatCurrency(inventoryValue),
      icon: Package,
      subtext: "Stock at cost price",
    },
    {
      title: "Items in Stock",
      amount: itemsInStock.toLocaleString(),
      icon: Boxes,
      subtext: `Across ${products.length} product${
        products.length === 1 ? "" : "s"
      }`,
    },
    {
      title: "Pending Orders",
      amount: pendingOrders.toLocaleString(),
      icon: ClipboardList,
      subtext: "Awaiting shipment",
    },
    {
      title: "Pending Purchases",
      amount: pendingPurchases.toLocaleString(),
      icon: ShoppingBag,
      subtext: "Awaiting receipt",
    },
    {
      title: "Low Stock",
      amount: lowStockCount.toLocaleString(),
      icon: TriangleAlert,
      subtext: "At or below reorder point",
    },
  ];

  return (
    <>
      <TotalCardList totals={totals} />

      <ActivityStrip
        salesOrders={salesOrders}
        purchaseOrders={purchaseOrders}
        products={products}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueChart salesOrders={salesOrders} className="lg:col-span-2" />
        <StatusChart salesOrders={salesOrders} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PurchaseStatusChart purchaseOrders={purchaseOrders} />
        <TopSellingProducts
          salesOrders={salesOrders}
          className="lg:col-span-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentSalesOrders salesOrders={salesOrders} />
        <RecentPurchaseOrders purchaseOrders={purchaseOrders} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <LowStockAlerts products={products} />
        <RecentStockMovements className="lg:col-span-2" />
      </div>
    </>
  );
};

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

  const hasError =
    (salesOrderIsError && salesOrderError) ||
    (productIsError && productError) ||
    (purchaseOrderIsError && purchaseOrderError);

  const isLoading =
    salesOrderIsLoading ||
    productIsLoading ||
    purchaseOrderIsLoading ||
    !salesOrderData ||
    !productData ||
    !purchaseOrderData;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Dashboard" }]}
        title="Dashboard"
        description="An overview of your sales, purchases, and inventory."
      />
      <div className="p-4 lg:p-6 flex flex-col grow space-y-4">
        {hasError ? (
          <Error message="Something went wrong!" />
        ) : isLoading ? (
          <DashboardSkeleton />
        ) : (
          <DashboardContent
            salesOrders={salesOrderData.salesOrders}
            products={productData.products}
            purchaseOrders={purchaseOrderData.purchaseOrders}
          />
        )}
      </div>
    </>
  );
};

export default Dashboard;
