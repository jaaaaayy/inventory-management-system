import { TSalesOrder } from "../types";

const SalesOrderDetails = ({ salesOrder }: { salesOrder: TSalesOrder }) => {
  console.log("SalesOrderDetails", salesOrder);
  return <div>SalesOrderDetails</div>;
};

export default SalesOrderDetails;
