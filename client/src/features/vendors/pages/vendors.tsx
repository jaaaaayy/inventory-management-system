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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="p-2 lg:p-4 grow">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl">Vendors</CardTitle>
            <Button onClick={() => navigate("/vendors/new")}>
              <Plus />
              New Vendor
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <VendorList />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Vendors;
