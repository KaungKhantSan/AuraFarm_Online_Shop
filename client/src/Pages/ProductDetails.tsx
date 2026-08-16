import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RatingConverter from "../common/RatingConverter";

const products = {
  id: 1,
  name: "T-shirt-1",
  price: 250,
  category: "Man",
  size: ["S", "M", "XL"],
  colors: ["#D0EDFF", "#1F2937", "#FF7575", "#919CFF", "#75FF48"],
  rating: 5,
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ad accusantium corporis assumenda aliquam voluptate quod fugiat consequatur exercitationem adipisci eos provident vitae, optio quos repellendus consequuntur. Cumque, commodi id!",
  images: [
    {
      url: "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
    },
    {
      url: "https://eu.aybl.com/cdn/shop/files/14.056955.jpg?v=1754050887&width=3901",
    },
    {
      url: "https://img01.ztat.net/article/spp-media-p1/ef2bc21183184c3280ba75a62eabff19/2c15ce5e03334d829aeff062fb1eab58.jpg?imwidth=762",
    },
    {
      url: "https://www.tennistown.de/m/images/Joma_Tennis-Tshirt_Challenge_Herren_103066_100_2.jpg",
    },
  ],
};

function ProductDetails() {
  const [selectedImage, setSelectedIamge] = useState<string>();
  const [selectedColor, setSelectedColor] = useState<string>();
  const { id } = useParams();

  useEffect(() => {
    if (products.images.length > 0) {
      setSelectedIamge(products.images[0].url);
    }

    if (products.colors.length > 0) {
      setSelectedColor("#D0EDFF");
    }
  }, [products]);

  return (
    <section className="mt-8">
      <div className="grid grid-cols-2 gap-2">
        <div className="grid grid-cols-4">
          <div className="col-span-1 flex flex-col gap-4">
            {products.images.map((image, index) => (
              <div
                className={`${selectedImage === image.url && "border-2 border-gray-300 w-fit rounded-xl"}`}
              >
                <img
                  src={image.url}
                  alt={image.url}
                  key={index}
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
        <div>
          <h2 className="font-semibold text-4xl mb-4">{products.name}</h2>
          <RatingConverter count={products.rating} />
          <p>{products.description}</p>
          <hr className="text-gray-500" />
          <h2 className="font-extrabold text-2xl mt-2 mb-2">Colors</h2>
          <div className="flex items-center gap-1">
            {products.colors.map((color, i) => (
              <div
                className={`w-6 h-6 rounded-full ${selectedColor === color && "border-2 border-amber-700"}`}
                style={{ backgroundColor: color }}
                key={i}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
