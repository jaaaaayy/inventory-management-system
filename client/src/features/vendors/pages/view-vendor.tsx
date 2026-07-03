import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import VendorDetails from "../components/vendor-details";
import VendorViewActions from "../components/vendor-view-actions";
import { useFetchVendor } from "../services/queries";

const ViewVendor = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchVendor(
    params.id
  );

  const vendor = data?.vendor;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Vendors", to: "/vendors" },
          { label: vendor?.name ?? "Vendor" },
        ]}
        title={vendor?.name ?? "Vendor"}
        actions={vendor && <VendorViewActions id={vendor._id} />}
      />
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
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
