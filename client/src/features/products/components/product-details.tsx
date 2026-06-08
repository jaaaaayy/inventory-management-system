import { TProduct } from "../types";
import { getImageUrl } from "@/lib/images";

const ProductDetails = ({ product }: { product: TProduct }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Product</h1>
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div className="flex gap-6">
          <div className="space-y-6">
            <p className="font-medium">Name</p>
            <p className="font-medium">Stock Keeping Unit</p>
            <p className="font-medium">Cost Price</p>
            <p className="font-medium">Selling Price</p>
            <p className="font-medium">Unit</p>
            <p className="font-medium">Quantity</p>
            <p className="font-medium">Reorder Point</p>
            <p className="font-medium">Category</p>
            <p className="font-medium">Vendor</p>
            <p className="font-medium">LastStockUpdate</p>
            <p className="font-medium">Created</p>
            <p className="font-medium">Updated</p>
          </div>
          <div className="space-y-6">
            <p>{product.name}</p>
            <p>{product.stockKeepingUnit}</p>
            <p>{product.costPrice}</p>
            <p>{product.sellingPrice}</p>
            <p>{product.unit}</p>
            <p>{product.quantity}</p>
            <p>{product.reorderPoint}</p>
            <p>{product.category}</p>
            <p>{product.vendor}</p>
            <p>{new Date(product.lastStockUpdate).toLocaleString()}</p>
            <p>{new Date(product.createdAt).toLocaleString()}</p>
            <p>{new Date(product.updatedAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-4">
          <img
            src={getImageUrl(product.imageUrl)}
            alt={product.name}
            className="size-60 object-cover rounded-md"
          />
          <div className="space-y-1">
            <p className="font-medium">Description</p>
            <p>{product.description || "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
