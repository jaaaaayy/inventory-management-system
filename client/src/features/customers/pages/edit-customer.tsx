import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import EditCustomerForm from "../components/form/edit-customer-form";
import { useFetchCustomer } from "../services/queries";

const EditCustomer = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchCustomer(
    params.id
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Customers", to: "/sales/customers" },
          { label: "Edit Customer" },
        ]}
        title="Edit Customer"
        description="Update this customer's details."
      />
      <div className="p-4 lg:p-6 grow min-h-0 flex flex-col">
        {isLoading || isPending ? (
          <Loading feature="customer" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <EditCustomerForm customer={data.customer} />
        )}
      </div>
    </>
  );
};

export default EditCustomer;
