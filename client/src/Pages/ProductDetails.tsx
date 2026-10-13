import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingConverter from "../common/RatingConverter";
import { Minus, Plus } from "lucide-react";
import { useGetProductDetailsQuery } from "@/store/slices/product";

function ProductDetails() {
  const [selectedImage, setSelectedIamge] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);
  const { id } = useParams();

  const { data: products, isLoading } = useGetProductDetailsQuery(id as string);

  useEffect(() => {
    if (!products) return;

    const images = products.images ?? [];
    const colors = products.color ?? [];
    const size = products.sizes ?? [];

    if (images.length > 0) setSelectedIamge(products.images[0].url);
    if (colors.length > 0) setSelectedColor(products.color[0]);
    if (size.length > 0) setSelectedSize(products.sizes[0]);
  }, [products]);

  if (isLoading) return <p>Loading...</p>;
  if (!products) return <p>Product not found.</p>;

  return (
    <section className="mt-8">
      <div className="grid grid-cols-2 gap-10">
        <div className="grid grid-cols-4">
          <div className="col-span-1 flex flex-col gap-4">
            {(products.images ?? []).map((image, index: number) => (
              <div
                className={`${selectedImage === image.url && "border-2 border-gray-300 w-fit rounded-xl"}`}
                key={index}
              >
                <img
                  src={image.url}
                  alt={image.url}
                  className="w-24 h-24 object-cover rounded-xl"
                  onClick={() => setSelectedIamge(image.url)}
                />
              </div>
            ))}
          </div>
          <img
            src={selectedImage}
            alt={selectedImage}
            className="col-span-3 h-full bg-gray-400 aspect-square rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <h2 className="font-semibold text-4xl mb-4">{products.name}</h2>
          <RatingConverter count={products.rating} />
          <p className="mb-2 text-description">{products.description}</p>
          <hr className="text-gray-500" />
          <h2 className="font-extrabold text-2xl mt-2 mb-2">Colors</h2>
          <div className="flex items-center gap-1">
            {(products.color ?? []).map((color, i: number) => (
              <div
                className={`w-6 h-6 rounded-full ${selectedColor === color && "border-2 border-amber-700"} cursor-pointer`}
                style={{ backgroundColor: color }}
                key={i}
                onClick={() => setSelectedColor(color)}
                title={color}
              />
            ))}
          </div>
          <div>
            <div className="mt-12 flex items-center justify-between">
              <div className="gap-2 flex">
                {(products.sizes ?? []).map((size, i: number) => (
                  <div
                    className={`border-2 font-bold rounded-full px-6 py-2 text-sm cursor-pointer ${selectedSize === size && "bg-black text-white border-black"}`}
                    key={i}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
              <div className="space-x-8 text-2xl">
                <button
                  className="bg-black p-2 text-white rounded-md cursor-pointer"
                  onClick={() => setQuantity((prev) => prev! + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="font-medium">{quantity}</span>
                <button
                  className="bg-black p-2 text-white rounded-md"
                  onClick={() =>
                    setQuantity((prev) => {
                      if (prev === 1) {
                        return 1;
                      }
                      return prev - 1;
                    })
                  }
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-12">
            <div className="font-extrabold text-3xl">
              Price - ${products.price}
            </div>
            <div>
              <button className="w-full text-center bg-add-to-cart text-white rounded-full px-6 py-2 font-extrabold">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
