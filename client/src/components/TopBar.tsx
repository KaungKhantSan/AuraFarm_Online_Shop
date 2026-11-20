import type { RootState } from "@/store";
import { LogIn, ShoppingBag, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUserQuery, useLogoutMutation } from "@/store/slices/userApi";
import { removeUserInfo } from "@/store/slices/auth";
import { useEffect } from "react";
import { apiSlice } from "@/store/slices/api";

interface toggleProps {
  toggleCart(): void;
}
const TopBar = ({ toggleCart }: toggleProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const { isError, data: currentUser } = useCurrentUserQuery();
  const navigate = useNavigate();
  const productInCart = useSelector(
    (state: RootState) => state.cart.item.length,
  );

  useEffect(() => {
    if (isError) {
      dispatch(removeUserInfo());
      navigate("/");
    }
  }, [isError]);

  const logouthandler = async () => {
    try {
      await logoutMutation({});
      dispatch(removeUserInfo());
      dispatch(apiSlice.util.resetApiState());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="text-white bg-black py-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={"/"}>
          <h2 className="font-bold text-2xl">Aura Farming</h2>
        </Link>
        <div className="flex gap-2">
          <div className="relative">
            <ShoppingBag onClick={toggleCart} className="cursor-pointer" />
            <span className="text-xs bg-red-500 rounded-full w-4 h-4 absolute text-center -top-2 -right-2">
              {productInCart}
            </span>
          </div>
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger className={"cursor-pointer"}>
                <User />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem className={"cursor-pointer"}>
                    <Link to={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logouthandler}
                    disabled={isLoading}
                    className={"text-red-600 cursor-pointer"}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={"/register"}>
              <LogIn />{" "}
            </Link>
          )}
          {currentUser?.role === "admin" && (
            <Link
              to={"/admin/manage-products"}
              className="bg-white text-black cursor-pointer rounded-md py-2 px-2"
            >
              Go to Admin panel
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default TopBar;
