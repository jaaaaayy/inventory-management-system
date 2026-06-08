import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import PurchaseOrderList from "../components/purchase-order-list";

const PurchaseOrders = () => {
  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Purchase Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Purchase Orders</h1>
        </div>
        <div className="space-y-6">
          <PurchaseOrderList />
        </div>
      </div>
    </>
  );
};

export default PurchaseOrders;
