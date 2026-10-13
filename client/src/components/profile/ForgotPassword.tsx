import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { Button } from "../ui/button";
import { toast } from "../ui/toast";

interface forgotPasswordProps {
  email: string;
}

function ForgotPassword({ email }: forgotPasswordProps) {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const forgotPasswordHandler = async () => {
    try {
      const res = await forgotPasswordMutation({ email }).unwrap();
      toast.add({
        type: "success",
        description: res.message,
      });
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message,
      });
      console.log(error);
    }
  };
  return (
    <Button onClick={forgotPasswordHandler} disabled={isLoading}>
      ForgotPassword
    </Button>
  );
}

export default ForgotPassword;
