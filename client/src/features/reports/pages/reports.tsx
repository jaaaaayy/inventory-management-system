import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import SalesReport from "../components/sales-report";
import InventoryValuationReport from "../components/inventory-valuation-report";
import LowStockReport from "../components/low-stock-report";
import StockMovementsReport from "../components/stock-movements-report";

const Reports = () => {
  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Reports</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow space-y-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <div className="space-y-6">
          <SalesReport />
          <InventoryValuationReport />
          <LowStockReport />
          <StockMovementsReport />
        </div>
      </div>
    </>
  );
};

export default Reports;
