import { TProduct } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getImageUrl } from "@/lib/images";
import { cn, formatCurrency } from "@/lib/utils";

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <>
    <dt className="font-medium text-muted-foreground">{label}</dt>
    <dd>{children}</dd>
  </>
);

const StatTile = ({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) => (
  <Card size="sm">
    <CardContent className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "text-2xl font-semibold tabular-nums",
          highlight && "text-amber-500"
        )}
      >
        {value}
      </p>
    </CardContent>
  </Card>
);

const ProductDetails = ({ product }: { product: TProduct }) => {
  const isLowStock = Number(product.quantity) <= Number(product.reorderPoint);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile label="On Hand" value={product.quantity} />
        <StatTile label="Available" value={product.availableQuantity} />
        <StatTile label="Reserved" value={product.reservedQuantity} />
        <StatTile
          label="Reorder Point"
          value={product.reorderPoint}
          highlight={isLowStock}
        />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card size="sm" className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start">
              <dl className="grid flex-1 grid-cols-[10rem_1fr] gap-x-4 gap-y-3 self-start">
                <DetailRow label="Name">{product.name}</DetailRow>
                <DetailRow label="SKU">{product.stockKeepingUnit}</DetailRow>
                <DetailRow label="Unit">{product.unit}</DetailRow>
                <DetailRow label="Category">{product.category}</DetailRow>
                <DetailRow label="Vendor">{product.vendor}</DetailRow>
                <DetailRow label="Description">
                  <span className="whitespace-normal">
                    {product.description || "—"}
                  </span>
                </DetailRow>
              </dl>
              <img
                src={getImageUrl(product.imageUrl)}
                alt={product.name}
                className="size-40 shrink-0 rounded-md object-cover sm:size-48"
              />
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-3">
                <DetailRow label="Cost Price">
                  <span className="tabular-nums">
                    {formatCurrency(Number(product.costPrice))}
                  </span>
                </DetailRow>
                <DetailRow label="Selling Price">
                  <span className="tabular-nums">
                    {formatCurrency(Number(product.sellingPrice))}
                  </span>
                </DetailRow>
              </dl>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Record</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-3">
                <DetailRow label="Last Stock Update">
                  {new Date(product.lastStockUpdate).toLocaleString()}
                </DetailRow>
                <DetailRow label="Created">
                  {new Date(product.createdAt).toLocaleString()}
                </DetailRow>
                <DetailRow label="Updated">
                  {new Date(product.updatedAt).toLocaleString()}
                </DetailRow>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
