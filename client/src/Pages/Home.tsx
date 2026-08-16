import ProductList from "../components/products/ProductList"

const Home = () => {
  return (
    <main className="mt-16">
      <section>
        <h2 className="text-2xl font-bold">New Arrival</h2>
        <ProductList/>
      </section>
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Best Deals</h2>
        <ProductList/>
        </section>
        </main>
  )
}

export default Home