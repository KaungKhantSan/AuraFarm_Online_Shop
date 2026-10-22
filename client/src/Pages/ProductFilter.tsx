import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import {
  useGetProductFilterQuery,
  useGetProductMetaQuery,
} from "@/store/slices/product";
import type { ProductFilter, ProductImage } from "@/types/product";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";

function ProductFilter() {
  const location = useLocation();

  const navigate = useNavigate();

  const initialFilter = (): ProductFilter => {
    const queryParam = new URLSearchParams(location.search);

    return {
      keyword: queryParam.get("keyword") || "",
      category: queryParam.get("category") || "",
      minPrice: queryParam.get("minPrice") || "",
      maxPrice: queryParam.get("maxPrice") || "",
      color: queryParam.getAll("color"),
      size: queryParam.getAll("size"),
    };
  };
  // local state (ui update from url)
  const [filter, setFilter] = useState(initialFilter);

  // update local state (when url change)
  useEffect(() => {
    setFilter(initialFilter());
  }, [location.search]);

  // sync url
  useEffect(() => {
    const params = new URLSearchParams();

    if (filter.keyword) params.set("keyword", filter.keyword);
    if (filter.category) params.set("category", filter.category);
    if (filter.minPrice) params.set("minPrice", filter.minPrice);
    if (filter.maxPrice) params.set("maxPrice", filter.maxPrice);

    filter.color.forEach((color) => params.append("color", color));
    filter.size.forEach((size) => params.append("size", size));

    const newSearchQuery = params.toString();
    const currentSearchQuery = location.search.slice(1);

    if (newSearchQuery !== currentSearchQuery) {
      const timeOutId = setTimeout(() => {
        navigate(
          { pathname: "/product/filter", search: params.toString() },
          { replace: true },
        );
      }, 100);
      return () => clearTimeout(timeOutId);
    }
  }, [filter, navigate, location.search]);
  const { data: products = [], isLoading } = useGetProductFilterQuery(
    filter,
  ) as { data: ProductImage[]; isLoading: boolean };

  const { data: productMeta } = useGetProductMetaQuery("none");

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    setFilter((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const toggleValue = (key: "color" | "size", value: string) => {
    setFilter((prev) => {
      const currentValue = prev[key];
      const newValue = currentValue.includes(value)
        ? currentValue.filter((x) => x !== value)
        : [...currentValue, value];
      return { ...prev, [key]: newValue };
    });
  };

  const clearAllFilter = () => {
    setFilter({
      keyword: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      color: [],
      size: [],
    });
    navigate("/product/filter", { replace: true });
  };

  const haveProductFilter = useMemo(() => {
    return (
      filter.category ||
      filter.color.length > 0 ||
      filter.size.length > 0 ||
      filter.keyword ||
      filter.maxPrice ||
      filter.minPrice
    );
  }, [filter]);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2">
        <h2 className="text-xl font-bold mb-2">Product Filter</h2>
        <h3 className="text-lg font-bold mb-2">Colors</h3>
        <div className="flex flex-col gap-1">
          {productMeta?.color.map((color, index) => (
            <label key={index}>
              <input
                type="checkbox"
                className="mt-2"
                onChange={() => toggleValue("color", color)}
                checked={filter.color.includes(color)}
              />
              <span>{color}</span>
            </label>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-2 mt-4">Sizes</h3>
        <div className="flex flex-col gap-1">
          {productMeta?.size.map((size, index) => (
            <label key={index}>
              <input
                type="checkbox"
                className="mt-2"
                onChange={() => toggleValue("size", size)}
                checked={filter.size.includes(size)}
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-2 mt-4">Price</h3>
        <div className="flex flex-col gap-1">
          <input
            type="number"
            min={0}
            placeholder={`Min - $ ${productMeta?.minPrice}`}
            className="border p-1"
            value={filter.minPrice!}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            min={productMeta?.minPrice}
            placeholder={`Max - $ ${productMeta?.maxPrice}`}
            className="border p-1"
            value={filter.maxPrice!}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
          />
        </div>
        {haveProductFilter && (
          <Button
            variant={"destructive"}
            onClick={clearAllFilter}
            className={"w-full mt-2"}
          >
            Clear All Filter
          </Button>
        )}
      </div>
      <div className="col-span-10">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        {isLoading ? (
          <p>Loading ...</p>
        ) : products.length === 0 ? (
          <p>no product found.</p>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductCard
                name={product.name}
                id={product._id}
                image={product.images[0].url}
                price={product.price}
                rating_count={product.rating_count}
                key={product._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductFilter;
