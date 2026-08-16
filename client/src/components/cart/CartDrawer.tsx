import { X } from "lucide-react";
import CartList from "./CartList";

interface iscartopenProps {
    iscartopen : boolean;
    toggleCart() : void;
}

const products = [
    {
        id : 1,
        name : "T-shirt-1",
        price : 250,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 5,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
                ]
    },
    {
        id : 2,
        name : "T-shirt-2",
        price : 200,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 4,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
        ]
    },
    {
        id : 3,
        name : "T-shirt-3",
        price : 230,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 4,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
        ]
    },
    {
        id : 4,
        name : "T-shirt-4",
        price : 300,
        category : "Man",
        size : ["S","M","XL"],
        colors : ["Blue","Black","White"],
        rating : 5,
        images : [
            {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
            },
                {
            url : "https://static.vecteezy.com/system/resources/thumbnails/051/866/612/small_2x/back-view-of-black-plain-t-shirt-mockup-png.png",
                }
        ]
    }
]

function CartDrawer({iscartopen,toggleCart} : iscartopenProps) {
  return (
    <div className={`bg-gray-200 fixed top-0 right-0 w-1/4 h-full transform transition-transform duration-300 z-50 p-4 ${
        iscartopen ? "translate-x-0" : "translate-x-full"
      }`}
      >
        <div className="flex justify-end w-full">
            <X onClick={toggleCart}/>
        </div>
        <h2 className="text-2xl font-bold my-4">Your Cart</h2>
            <div>
                {products.map(product => <CartList name={product.name} price={product.price} color={product.colors[0]} size={product.size[0]} key={product.id} image={product.images[0].url}/>)}
            </div>
            <button className="bg-gray-500 w-full py-4 text-white rounded-md fixed bottom-1 left-0 mb-2">
                Go to Checkout
            </button>
      </div>
  )
}

export default CartDrawer