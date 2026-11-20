import type { RootState } from "@/store";
import { removeUserInfo } from "@/store/slices/auth";
import { useCurrentUserQuery } from "@/store/slices/userApi";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

function IsLogin({ children }: { children: React.ReactNode }) {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const { isError } = useCurrentUserQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || isError) {
      navigate("/");
      dispatch(removeUserInfo());
    }
  }, [userInfo, isError]);
  return <>{children}</>;
}

export default IsLogin;
