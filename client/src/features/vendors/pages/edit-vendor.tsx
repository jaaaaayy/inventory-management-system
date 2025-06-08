import Error from "@/components/error";
import Header from "@/components/header";
import Loading from "@/components/loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useFetchVendor } from "../services/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EditVendorForm from "../components/form/edit-vendor-form";

const EditVendor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchVendor(
    params.id
  );

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
              <BreadcrumbPage>Edit Vendor</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow min-h-0 space-y-4">
        <Button variant="ghost" onClick={() => navigate("/vendors")}>
          <ArrowLeft />
          Back to Vendors
        </Button>
        {isLoading || isPending ? (
          <Loading feature="vendor" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit Vendor</CardTitle>
            </CardHeader>
            <CardContent>
              <EditVendorForm vendor={data.vendor} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default EditVendor;
