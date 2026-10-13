import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useCurrentProfileMutation,
  useCurrentUserQuery,
} from "@/store/slices/userApi";
import React, { useRef, useState } from "react";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EmailUpdate from "@/components/profile/EmailUpdate";
import { Loader } from "lucide-react";
import NameUpdate from "@/components/profile/NameUpdate";
import PasswordUpdate from "@/components/profile/PasswordUpdate";
import ForgotPassword from "@/components/profile/ForgotPassword";

function Profile() {
  const { isLoading: isGetting, data: user, refetch } = useCurrentUserQuery();
  const [currentUserProfileMutation, { isLoading }] =
    useCurrentProfileMutation();
  const [avatar, setAvatar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const imageOnChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const profileUploadHandler = async () => {
    if (!avatar) {
      toast.add({
        type: "warning",
        description: "Please choose profile picture first.",
      });
      return;
    }

    try {
      await currentUserProfileMutation({ image_url: avatar }).unwrap();
      setAvatar(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      refetch();
      toast.add({
        type: "success",
        description: "Profile picture upload success.",
      });
    } catch (error: any) {
      toast.add({
        type: "error",
        description: error?.data?.message || "Upload failed.",
      });
    }
  };

  return (
    <>
      {isGetting ? (
        <Loader />
      ) : (
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <Avatar className={"w-20 h-20"}>
                  <AvatarImage
                    src={avatar ?? user?.avatar?.[0]?.url ?? ""}
                    className={"text-2xl"}
                  />
                  <AvatarFallback>{user?.username.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  onChange={imageOnChangeHandler}
                  className="mt-2"
                />
              </div>
              <Button
                onClick={profileUploadHandler}
                disabled={isLoading || !avatar}
              >
                Upload
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>Update Email Address</CardDescription>
            </CardHeader>
            <CardContent>
              <EmailUpdate email={user?.email!} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Name</CardTitle>
              <CardDescription>Update Your Username</CardDescription>
            </CardHeader>
            <CardContent>
              <NameUpdate username={user?.username!} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Update Password</CardDescription>
            </CardHeader>
            <CardContent>
              <PasswordUpdate />
              <ForgotPassword email={user?.email!} />
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}

export default Profile;
