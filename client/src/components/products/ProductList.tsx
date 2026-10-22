import type { ProductImage } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: ProductImage[];
}

const ProductList = ({ products }: ProductListProps) => {
  return (
    <main className="grid grid-cols-4 gap-6 mt-4">
      {products.map((product) => (
        <ProductCard
          name={product.name}
          price={product.price}
          image={product.images[0].url}
          rating_count={product.rating_count}
          key={product._id}
          id={product._id}
        />
      ))}
    </main>
  );
};

export default ProductList;
