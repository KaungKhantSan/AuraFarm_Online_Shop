import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductFilterQuery } from "@/store/slices/product";
import type { ProductImage } from "@/types/product";
import { Package } from "lucide-react";
import ProductStatusCards from "./ProductStatusCards";

function ProductManagement() {
  const {
    data: response,
    isLoading,
    error,
  } = useGetProductFilterQuery({}) as {
    data: ProductImage[];
    isLoading: boolean;
    error: any;
  };

  const products = response || [];

  if (error) {
    return (
      <div>
        <Card>
          <CardContent>
            <p className="text-destructive">
              Failed to load product. Try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">Manage your product invertory</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <ProductStatusCards
          title="Total Product"
          isLoading={isLoading}
          value={products.length}
        />
        <ProductStatusCards
          title="Instock Count"
          isLoading={isLoading}
          iconColor="text-green-400"
          value={products.filter((p) => p.instock_count > 0).length}
        />
        <ProductStatusCards
          title="Out of Stock"
          isLoading={isLoading}
          iconColor="text-destructive"
          value={products.filter((p) => p.instock_count === 0).length}
        />
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Product Inventory</CardTitle>
            <CardDescription>Manage your product</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Product Table</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductManagement;
