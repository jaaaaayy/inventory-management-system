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
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import CreateVendorForm from "../components/form/create-vendor-form";

const CreateVendor = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/vendors">Vendors</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Vendor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow flex flex-col min-h-0 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New Vendor</h1>
          <Button variant="ghost" onClick={() => navigate("/vendors")}>
            <ArrowLeft />
            Back to Vendors
          </Button>
        </div>
        <CreateVendorForm />
      </div>
    </>
  );
};

export default CreateVendor;
