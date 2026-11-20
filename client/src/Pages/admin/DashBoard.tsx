import { useGetProductFilterQuery } from "@/store/slices/product";
import type { ProductImage } from "@/types/product";
import ProductStatusCards from "./ProductStatusCards";
import ProductChart from "./ProductChart";
import RecentProduct from "@/components/admin/RecentProduct";
import OrderTable from "@/components/admin/OrderTable";

function DashBoard() {
  const { data: product = [], isLoading } = useGetProductFilterQuery({}) as {
    data: ProductImage[];
    isLoading: boolean;
  };

  const totalProducts = product.length;
  const is_FeaturedCount = product.filter((p) => p.is_feature).length;
  const is_New_ArrivalCount = product.filter((p) => p.is_new_arrival).length;
  const inStockCount = product.reduce((sum, p) => sum + p.instock_count, 0);

  return (
    <section>
      <div className="grid grid-cols-4 gap-3 mb-4">
        <ProductStatusCards
          title="Total Product"
          value={totalProducts}
          isLoading={isLoading}
        />
        <ProductStatusCards
          title="Featured Product"
          value={is_FeaturedCount}
          isLoading={isLoading}
        />
        <ProductStatusCards
          title="New Arrival"
          value={is_New_ArrivalCount}
          isLoading={isLoading}
        />
        <ProductStatusCards
          title="Total Instock Count"
          value={inStockCount}
          isLoading={isLoading}
        />
      </div>
      <ProductChart data={product} />
      <div className="mt-6 flex gap-6">
        <RecentProduct data={product} />
        <OrderTable />
      </div>
    </section>
  );
}

export default DashBoard;
