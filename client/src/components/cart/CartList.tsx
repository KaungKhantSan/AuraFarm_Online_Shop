import {
  decreaseQuantity,
  increaseQuantity,
  removeItemInCart,
} from "@/store/slices/cart";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";

interface cartListProps {
  name: string;
  size: string;
  color: string;
  price: number;
  image: string;
  quantity: number;
  productKey: string;
}

function CartList({
  name,
  size,
  color,
  price,
  image,
  quantity,
  productKey,
}: cartListProps) {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between border-b pb-4 border-gray-200">
      <div className="flex gap-2 items-center">
        <img
          src={image}
          alt={name}
          className="bg-gray-500 w-24 h-24 rounded-md"
        />
        <div className="flex flex-col">
          <span className="text-sm font-bold">{name}</span>
          <span className="text-xs font-medium text-gray-400">
            size - {size}
          </span>
          <span className="text-xs font-medium text-gray-400">
            color - {color}
          </span>
          <span className="font-bold mt-1 text-lg">${price}</span>
        </div>
      </div>
      <div className="flex items-end flex-col justify-between">
        <Trash
          className="w-6 h-6 text-red-400 cursor-pointer"
          onClick={() => dispatch(removeItemInCart(productKey))}
        />
        <div className="flex items-center gap-2">
          <button
            className="bg-black p-2 text-white rounded-md cursor-pointer"
            onClick={() => dispatch(increaseQuantity(productKey))}
          >
            <Plus className="w-4 h-4" />
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            className="bg-black p-2 text-white rounded-md cursor-pointer"
            onClick={() => dispatch(decreaseQuantity(productKey))}
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
