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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="p-2 lg:p-4 grow space-y-4">
        <Button variant="ghost" onClick={() => navigate("/vendors")}>
          <ArrowLeft />
          Back to Vendors
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">New Vendor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CreateVendorForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateVendor;
