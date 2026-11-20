import type { ProductImage } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface recentProductProps {
  data: ProductImage[];
}

function RecentProduct({ data }: recentProductProps) {
  const recentProduct = [...data]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
        </CardHeader>
        <CardContent>
          {recentProduct.map((product) => (
            <div className="py-2  border-b border-b-gray-300">
              <h2 className="mb-1 text-sm font-medium">{product.name}</h2>
              <Badge>{product.category}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default RecentProduct;
