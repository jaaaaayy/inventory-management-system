import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import CustomerDetails from "../components/customer-details";
import CustomerViewActions from "../components/customer-view-actions";
import { useFetchCustomer } from "../services/queries";

const ViewCustomer = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchCustomer(
    params.id
  );

  const customer = data?.customer;
  const customerName = customer
    ? `${customer.firstName} ${customer.lastName}`
    : "Customer";

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Customers", to: "/sales/customers" },
          { label: customerName },
        ]}
        title={customerName}
        actions={customer && <CustomerViewActions id={customer._id} />}
      />
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
        {isLoading || isPending ? (
          <Loading feature="customer" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <CustomerDetails customer={data.customer} />
        )}
      </div>
    </>
  );
};

export default ViewCustomer;
