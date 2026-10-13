import { Link } from "react-router";
import RatingConverter from "../../common/RatingConverter";

interface productCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

function ProductCard({ name, price, image, rating, id }: productCardProps) {
  return (
    <Link to={`/product/${id}`}>
      <img src={image} alt={name} className="rounded-lg bg-gray-400" />
      <p className="font-semibold">{name}</p>
      <RatingConverter count={rating} />
      <p className="font-bold text-xl">${price}</p>
    </Link>
  );
}

export default ProductCard;
