import { Link } from "react-router";
import RatingConverter from "../../common/RatingConverter";

interface productCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating_count: number;
}

function ProductCard({
  name,
  price,
  image,
  rating_count,
  id,
}: productCardProps) {
  return (
    <Link to={`/product/${id}`}>
      <img
        src={image}
        alt={name}
        className="rounded-lg h-60 object-cover border-2 border-gray-300 w-full"
      />
      <p className="font-medium my-2">
        {name.length > 20 ? name.slice(0, 20) + "..." : name}
      </p>
      <RatingConverter rating_count={rating_count} />
      <p className="font-bold text-xl">${price}</p>
    </Link>
  );
}

export default ProductCard;
