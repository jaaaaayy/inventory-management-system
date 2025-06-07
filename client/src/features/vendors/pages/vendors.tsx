import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import VendorList from "../components/vendor-list";

const Vendors = () => {
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
              <BreadcrumbPage>Vendors</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow flex flex-col min-h-0 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Vendors</h1>
          <Button onClick={() => navigate("/vendors/new")}>
            <Plus />
            New Category
          </Button>
        </div>
        <VendorList />
      </div>
    </>
  );
};

export default Vendors;
