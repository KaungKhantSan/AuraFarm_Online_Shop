import RatingConverter from "../../common/RatingConverter";

interface productCardProps {
    name : string;
    price : number;
    image : string;
    rating : number;
}

function ProductCard({name,price,image,rating}:productCardProps) {
  return (
    <div>
        <img src={image} alt={name} className="rounded-lg bg-gray-400"/>
        <p className="font-semibold">{name}</p>
        <RatingConverter count={rating}/>
        <p className="font-bold text-xl">${price}</p>
        </div>
  )
}

export default ProductCard