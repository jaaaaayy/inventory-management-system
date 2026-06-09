import { TSalesOrder } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getImageUrl } from "@/lib/images";
import SalesOrderStatusBadge from "./status-badge";

const SalesOrderDetails = ({ salesOrder }: { salesOrder: TSalesOrder }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">
          Sales Order{" "}
          <span className="text-muted-foreground">
            {salesOrder.orderNumber}
          </span>
        </h1>
        <SalesOrderStatusBadge status={salesOrder.status} />
      </div>
      <div className="space-y-6 text-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-6">
            <div className="space-y-6">
              <p className="font-medium">Order Date</p>
              <p className="font-medium">Delivery Date</p>
              <p className="font-medium">Created By</p>
            </div>
            <div className="space-y-6">
              <p>{new Date(salesOrder.orderDate).toLocaleDateString()}</p>
              <p>{new Date(salesOrder.deliveryDate).toLocaleDateString()}</p>
              <p>{salesOrder.createdBy ?? "—"}</p>
            </div>
          </div>
          <div className="space-y-6">
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
        {salesOrder.notes && (
          <div className="space-y-1">
            <p className="font-medium">Notes</p>
            <p className="text-muted-foreground">{salesOrder.notes}</p>
          </div>
        )}
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="border">Item</TableHead>
              <TableHead className="border">Quantity</TableHead>
              <TableHead className="border">Unit Price</TableHead>
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
                      src={getImageUrl(item.product.imageUrl)}
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
                  }).format(item.unitPrice)}
                </TableCell>
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
      </div>
    </div>
  );
};

export default SalesOrderDetails;
