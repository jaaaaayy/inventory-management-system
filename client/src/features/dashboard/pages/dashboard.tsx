import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import TotalCardList from "../components/total-card-list";
import Loading from "@/components/loading";
import { useFetchSalesOrderList } from "@/features/salesOrders/services/queries";
import Error from "@/components/error";
import { useFetchProductList } from "@/features/products/services/queries";
import { useFetchCustomerList } from "@/features/customers/services/queries";
import { useFetchVendorList } from "@/features/vendors/services/queries";

const Dashboard = () => {
  const {
    isLoading: salesOrderIsLoading,
    isError: salesOrderIsError,
    error: salesOrderError,
    data: salesOrderData,
  } = useFetchSalesOrderList();
  const {
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
    data: productData,
  } = useFetchProductList();
  const {
    isLoading: customerIsLoading,
    isError: customerIsError,
    error: customerError,
    data: customerData,
  } = useFetchCustomerList();
  const {
    isLoading: vendorIsLoading,
    isError: vendorIsError,
    error: vendorError,
    data: vendorData,
  } = useFetchVendorList();

  if (
    (salesOrderIsError && salesOrderError) ||
    (productIsError && productError) ||
    (customerIsError && customerError) ||
    (vendorIsError && vendorError)
  ) {
    return <Error message="Something went wrong!" />;
  }

  if (
    salesOrderIsLoading ||
    productIsLoading ||
    customerIsLoading ||
    vendorIsLoading
  ) {
    return <Loading feature="dashboard" />;
  }

  const totals = [
    { title: "Products", amount: productData.products.length },
    { title: "Sales Orders", amount: salesOrderData.salesOrders.length },
    { title: "Customers", amount: customerData.customers.length },
    { title: "Vendors", amount: vendorData.vendors.length },
  ];

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 flex flex-col grow space-y-6">
        <TotalCardList totals={totals} />
      </div>
    </>
  );
};

export default Dashboard;
