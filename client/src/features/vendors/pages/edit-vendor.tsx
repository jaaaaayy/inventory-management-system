import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import EditVendorForm from "../components/form/edit-vendor-form";
import { useFetchVendor } from "../services/queries";

const EditVendor = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchVendor(
    params.id
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Vendors", to: "/vendors" },
          { label: "Edit Vendor" },
        ]}
        title="Edit Vendor"
        description="Update this vendor's details."
      />
      <div className="p-4 lg:p-6 grow min-h-0 flex flex-col">
        {isLoading || isPending ? (
          <Loading feature="vendor" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <EditVendorForm vendor={data.vendor} />
        )}
      </div>
    </>
  );
};

export default EditVendor;
