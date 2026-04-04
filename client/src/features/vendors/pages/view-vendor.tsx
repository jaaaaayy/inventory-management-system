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
import { Link, useNavigate, useParams } from "react-router-dom";
import VendorDetails from "../components/vendor-details";
import { useFetchVendor } from "../services/queries";

const ViewVendor = () => {
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
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/vendors">Vendors</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.vendor?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
        <Button variant="ghost" onClick={() => navigate("/vendors")}>
          <ArrowLeft />
          Back to Vendors
        </Button>
        {isLoading || isPending ? (
          <Loading feature="vendor" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <VendorDetails vendor={data.vendor} />
        )}
      </div>
    </>
  );
};

export default ViewVendor;
