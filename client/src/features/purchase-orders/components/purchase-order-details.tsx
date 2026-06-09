import { TPurchaseOrder } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getImageUrl } from "@/lib/images";
import PurchaseOrderStatusBadge from "./status-badge";

const PurchaseOrderDetails = ({
  purchaseOrder,
}: {
  purchaseOrder: TPurchaseOrder;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold">
          Purchase Order{" "}
          <span className="text-muted-foreground">
            {purchaseOrder.orderNumber}
          </span>
        </h1>
        <PurchaseOrderStatusBadge status={purchaseOrder.status} />
      </div>
      <div className="space-y-6 text-sm">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex gap-6">
            <div className="space-y-6">
              <p className="font-medium">Order Date</p>
              <p className="font-medium">Expected Date</p>
              <p className="font-medium">Received Date</p>
              <p className="font-medium">Created By</p>
            </div>
            <div className="space-y-6">
              <p>{new Date(purchaseOrder.orderDate).toLocaleDateString()}</p>
              <p>{new Date(purchaseOrder.expectedDate).toLocaleDateString()}</p>
              <p>
                {purchaseOrder.receivedDate
                  ? new Date(purchaseOrder.receivedDate).toLocaleDateString()
                  : "—"}
              </p>
              <p>{purchaseOrder.createdBy ?? "—"}</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="font-medium">Vendor</p>
            <p>{purchaseOrder.vendor.name}</p>
            <div>
              <p>{purchaseOrder.vendor.address.addressLine1}</p>
              <p>{purchaseOrder.vendor.address?.addressLine2}</p>
              <p>{purchaseOrder.vendor.address.city}</p>
              <p>{purchaseOrder.vendor.address.postalCode}</p>
              <p>{purchaseOrder.vendor.address.province}</p>
            </div>
          </div>
        </div>
        {purchaseOrder.notes && (
          <div className="space-y-1">
            <p className="font-medium">Notes</p>
            <p className="text-muted-foreground">{purchaseOrder.notes}</p>
          </div>
        )}
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="border">Item</TableHead>
              <TableHead className="border">Quantity</TableHead>
              <TableHead className="border">Received</TableHead>
              <TableHead className="border">Unit Price</TableHead>
              <TableHead className="border">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrder.items.map((item) => (
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
                  {item.receivedQuantity} / {item.quantity}
                </TableCell>
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
            }).format(Number(purchaseOrder.totalAmount))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;
