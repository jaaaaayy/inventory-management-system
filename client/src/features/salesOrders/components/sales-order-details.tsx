import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TSalesOrder } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_URL = import.meta.env.VITE_API_URL;

const SalesOrderDetails = ({ salesOrder }: { salesOrder: TSalesOrder }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sales Order Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-6">
            <div className="space-y-4">
              <p className="font-medium">Order Date</p>
              <p className="font-medium">Delivery Date</p>
            </div>
            <div className="space-y-4">
              <p>{new Date(salesOrder.orderDate).toLocaleDateString()}</p>
              <p>{new Date(salesOrder.deliveryDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium">Address</p>
            <p>
              {salesOrder.customer.firstName} {salesOrder.customer.lastName}
            </p>
            <div>
              <p>{salesOrder.customer.address.addressLine1}</p>
              <p>{salesOrder.customer.address?.addressLine2}</p>
              <p>{salesOrder.customer.address.city}</p>
              <p>{salesOrder.customer.address.postalCode}</p>
              <p>{salesOrder.customer.address.province}</p>
            </div>
          </div>
        </div>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="border">Item</TableHead>
              <TableHead className="border">Quantity</TableHead>
              <TableHead className="border">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesOrder.items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="border">
                  <div className="flex items-center gap-2">
                    <img
                      className="size-8 rounded object-cover"
                      src={`${API_URL}${item.product.imageUrl}`}
                      alt={item.product.name}
                    />
                    <span>{item.product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="border">{item.quantity}</TableCell>
                <TableCell className="border">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "PHP",
                  }).format(item.totalPrice)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="font-medium flex justify-between w-1/3 float-end p-6 py-0">
          <p>Total</p>
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "PHP",
            }).format(Number(salesOrder.totalAmount))}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesOrderDetails;
