import { TSalesOrder } from "../types";
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

const SalesOrderDetails = ({ salesOrder }: { salesOrder: TSalesOrder }) => {
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
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesOrder.items.map((item) => (
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
                  {formatCurrency(Number(salesOrder.totalAmount))}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-4">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-[8rem_1fr] gap-x-4 gap-y-3">
              <dt className="font-medium text-muted-foreground">Name</dt>
              <dd>
                {salesOrder.customer.firstName} {salesOrder.customer.lastName}
              </dd>
              <dt className="font-medium text-muted-foreground">Address</dt>
              <dd>
                <p>{salesOrder.customer.address.addressLine1}</p>
                <p>{salesOrder.customer.address?.addressLine2}</p>
                <p>{salesOrder.customer.address.city}</p>
                <p>{salesOrder.customer.address.postalCode}</p>
                <p>{salesOrder.customer.address.province}</p>
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
              <dd>{new Date(salesOrder.orderDate).toLocaleDateString()}</dd>
              <dt className="font-medium text-muted-foreground">
                Delivery Date
              </dt>
              <dd>{new Date(salesOrder.deliveryDate).toLocaleDateString()}</dd>
              <dt className="font-medium text-muted-foreground">Created By</dt>
              <dd>{salesOrder.createdBy ?? "—"}</dd>
              {salesOrder.notes && (
                <>
                  <dt className="font-medium text-muted-foreground">Notes</dt>
                  <dd className="whitespace-normal">{salesOrder.notes}</dd>
                </>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesOrderDetails;
