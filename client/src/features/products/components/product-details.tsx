import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { TProduct } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = ({ product }: { product: TProduct }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Product Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="grid grid-cols-2 gap-2 items-start">
            <div className="grid gap-2">
              <Label>Name</Label>
              <p>{product.name}</p>
            </div>
            <div className="grid gap-2">
              <Label>Stock Keeping Unit</Label>
              <p>{product.stockKeepingUnit}</p>
            </div>
            <div className="grid gap-2">
              <Label>Cost Price</Label>
              <p>{product.costPrice}</p>
            </div>
            <div className="grid gap-2">
              <Label>Selling Price</Label>
              <p>{product.sellingPrice}</p>
            </div>
            <div className="grid gap-2">
              <Label>Unit</Label>
              <p>{product.unit}</p>
            </div>
            <div className="grid gap-2">
              <Label>Quantity</Label>
              <p>{product.quantity}</p>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Image</Label>
            <div className="size-60 rounded-md flex items-center justify-center">
              <img
                src={`${API_URL}${product.imageUrl}`}
                alt={product.name}
                className="size-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6">
          <div className="grid gap-2">
            <Label>Category</Label>
            <p>{product.category}</p>
          </div>
          <div className="grid gap-2">
            <Label>Vendor</Label>
            <p>{product.vendor}</p>
          </div>
          <div className="grid gap-2">
            <Label>LastStockUpdate</Label>
            <p>{new Date(product.lastStockUpdate).toLocaleString()}</p>
          </div>
          <div className="grid gap-2">
            <Label>Created</Label>
            <p>{new Date(product.createdAt).toLocaleString()}</p>
          </div>
          <div className="grid gap-2">
            <Label>Updated</Label>
            <p>{new Date(product.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
