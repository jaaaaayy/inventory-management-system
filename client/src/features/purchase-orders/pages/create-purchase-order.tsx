import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CreatePurchaseOrderForm from "../components/form/create-purchase-order-form";

const CreatePurchaseOrder = () => {
  const navigate = useNavigate();
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
              <BreadcrumbLink asChild>
                <Link to="/purchase/orders">Purchase orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Purchase Order</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow space-y-6">
        <Button variant="ghost" onClick={() => navigate("/purchase/orders")}>
          <ArrowLeft />
          Back to Purchase orders
        </Button>
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">New Purchase Order</h1>
          <div>
            <CreatePurchaseOrderForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePurchaseOrder;
