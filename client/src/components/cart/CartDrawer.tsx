import { X } from "lucide-react";
import CartList from "./CartList";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Button } from "../ui/button";
import { clearCart } from "@/store/slices/cart";
import { useCreateOrderMutation } from "@/store/slices/orderApi";

interface iscartopenProps {
  iscartopen: boolean;
  toggleCart(): void;
}

function CartDrawer({ iscartopen, toggleCart }: iscartopenProps) {
  const products = useSelector((state: RootState) => state.cart.item);
  const dispatch = useDispatch();
  const productInCart = useSelector(
    (state: RootState) => state.cart.item.length,
  );
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const bill = products.reduce(
    (sum, items) => sum + Number(items.price) * items.quantity,
    0,
  );
  const checkOutHandler = async () => {
    try {
      const { url } = await createOrder({ items: products, bill }).unwrap();
      window.location.href = url;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className={`bg-gray-200 fixed top-0 right-0 w-1/4 h-full transform transition-transform duration-300 z-50 p-4 ${
        iscartopen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end w-full">
        <X onClick={toggleCart} className="cursor-pointer" />
      </div>
      <div className="mt-4 mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold my-4">Your Cart</h2>
        {productInCart > 1 && (
          <Button
            size={"sm"}
            variant={"destructive"}
            className={"cursor-pointer"}
            onClick={() => dispatch(clearCart())}
          >
            Clear All
          </Button>
        )}
      </div>
      <div>
        {products.map((product) => (
          <CartList
            name={product.name}
            price={Number(product.price)}
            color={product.color}
            size={product.size}
            key={product.key}
            image={product.image}
            quantity={product.quantity}
            productKey={product.key!}
          />
        ))}
      </div>
      {products.length === 0 && (
        <div>
          <p>No item in cart.</p>
        </div>
      )}
      {products.length > 0 && (
        <button
          className="bg-gray-500 w-full py-4 px-2 text-white rounded-md fixed bottom-1 left-0 mb-2 cursor-pointer"
          onClick={checkOutHandler}
          disabled={isLoading}
        >
          Go to Checkout
        </button>
      )}
    </div>
  );
}

export default CartDrawer;
