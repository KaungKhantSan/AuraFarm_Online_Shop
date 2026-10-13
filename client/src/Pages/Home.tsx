import {
  useGetIsFeaturedQuery,
  useGetNewArrivalQuery,
} from "@/store/slices/product";
import ProductList from "../components/products/ProductList";

const Home = () => {
  const { data: newArrival = [] } = useGetNewArrivalQuery(undefined);
  const { data: isFeatured = [] } = useGetIsFeaturedQuery(undefined);

  return (
    <main className="mt-16">
      <section>
        <h2 className="text-2xl font-bold">New Arrival</h2>
        <ProductList products={newArrival} />
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Is Featured</h2>
        <ProductList products={isFeatured} />
      </section>
    </main>
  );
};

export default Home;
