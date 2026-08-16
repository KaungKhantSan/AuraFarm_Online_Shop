import { useState } from "react"
import TopBar from "../components/TopBar";
import CartDrawer from "../components/cart/CartDrawer";

function NavBar() {

  const [iscartopen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <nav>
      <TopBar toggleCart={toggleCart}/>
      <CartDrawer iscartopen={iscartopen} toggleCart={toggleCart}/>
    </nav>
  )
}

export default NavBar