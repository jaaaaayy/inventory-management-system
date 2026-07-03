import { TPurchaseOrder } from "../types";
import TableContainer from "@/components/table-container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getImageUrl } from "@/lib/images";
import { formatCurrency } from "@/lib/utils";

const PurchaseOrderDetails = ({
  purchaseOrder,
}: {
  purchaseOrder: TPurchaseOrder;
}) => {
  return (
    <div className="grid gap-4 xl:grid-cols-3">
      <div className="space-y-4 xl:col-span-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Received</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrder.items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            className="size-8 rounded object-cover"
                            src={getImageUrl(item.product.imageUrl)}
                            alt={item.product.name}
                          />
                          <span>{item.product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {item.receivedQuantity} / {item.quantity}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(item.unitPrice)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(item.totalPrice)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="ml-auto w-full max-w-xs space-y-2">
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatCurrency(Number(purchaseOrder.totalAmount))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd>{purchaseOrder.vendor.name}</dd>
              <dt className="font-medium text-muted-foreground">Address</dt>
              <dd>
                <p>{purchaseOrder.vendor.address.addressLine1}</p>
                <p>{purchaseOrder.vendor.address?.addressLine2}</p>
                <p>{purchaseOrder.vendor.address.city}</p>
                <p>{purchaseOrder.vendor.address.postalCode}</p>
                <p>{purchaseOrder.vendor.address.province}</p>
              </dd>
            </dl>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">Order Date</dt>
              <dd>{new Date(purchaseOrder.orderDate).toLocaleDateString()}</dd>
              <dt className="font-medium text-muted-foreground">
                Expected Date
              </dt>
              <dd>
                {new Date(purchaseOrder.expectedDate).toLocaleDateString()}
              </dd>
              <dt className="font-medium text-muted-foreground">
                Received Date
              </dt>
              <dd>
                {purchaseOrder.receivedDate
                  ? new Date(purchaseOrder.receivedDate).toLocaleDateString()
                  : "—"}
              </dd>
              <dt className="font-medium text-muted-foreground">Created By</dt>
              <dd>{purchaseOrder.createdBy ?? "—"}</dd>
              {purchaseOrder.notes && (
                <>
                  <dt className="font-medium text-muted-foreground">Notes</dt>
                  <dd className="whitespace-normal">{purchaseOrder.notes}</dd>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseOrderDetails;
