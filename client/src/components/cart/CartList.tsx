import { Minus, Plus, Trash } from "lucide-react";

interface cartListProps {
    name : string;
    size : string;
    color : string;
    price : number;
    image : string;
}

function CartList({name, size, color, price, image}:cartListProps) {
  return (
    <div className="flex justify-between border-b pb-4 border-gray-200">
        <div className="flex gap-2 items-center">
            <img src={image} alt={name} className="bg-gray-500 w-24 h-24 rounded-md"/>
            <div className="flex flex-col">
                <span className="text-sm font-bold">{name}</span>
                <span className="text-xs font-medium text-gray-400">size - {size}</span>
                <span className="text-xs font-medium text-gray-400">color - {color}</span>
                <span className="font-bold mt-1 text-lg">${price}</span>
            </div>
        </div>
        <div className="flex items-end flex-col justify-between">
            <Trash className="w-6 h-6 text-red-400"/>
            <div className="flex items-center gap-2">
                <button className="bg-black p-2 text-white rounded-md">
                    <Plus className="w-4 h-4"/>
                </button>
                <span className="font-medium">1</span>
                <button className="bg-black p-2 text-white rounded-md">
                    <Minus className="w-4 h-4"/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartList