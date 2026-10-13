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
import { useLogoutMutation } from "@/store/slices/userApi";
import { removeUserInfo } from "@/store/slices/auth";

interface toggleProps {
  toggleCart(): void;
}
const TopBar = ({ toggleCart }: toggleProps) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [logoutMutation, { isLoading, isError }] = useLogoutMutation();
  const dispatch = useDispatch();

  const logouthandler = async () => {
    try {
      await logoutMutation({});
      dispatch(removeUserInfo());
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
          <ShoppingBag onClick={toggleCart} />
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
        </div>
      </div>
    </main>
  );
};

export default TopBar;
