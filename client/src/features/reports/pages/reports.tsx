import PageHeader from "@/components/page-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import SalesReport from "../components/sales-report";
import InventoryValuationReport from "../components/inventory-valuation-report";
import LowStockReport from "../components/low-stock-report";
import StockMovementsReport from "../components/stock-movements-report";

const Reports = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Reports" },
        ]}
        title="Reports"
        description="Analyze sales, inventory value, and stock activity."
      />
      <div className="p-4 lg:p-6 grow">
        <Tabs defaultValue="sales">
          <TabsList className="w-full max-w-xl">
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="valuation">Valuation</TabsTrigger>
            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
            <TabsTrigger value="movements">Movements</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <SalesReport />
          </TabsContent>
          <TabsContent value="valuation">
            <InventoryValuationReport />
          </TabsContent>
          <TabsContent value="low-stock">
            <LowStockReport />
          </TabsContent>
          <TabsContent value="movements">
            <StockMovementsReport />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Reports;
