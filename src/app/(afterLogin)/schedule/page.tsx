"use client";

import { useUserStore } from "@store";
import { setTokenInCookies } from "@utils";
import { redirect, useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function Schedule() {
  const params = useSearchParams().get("token");
  const [token, setToken] = useState<string>();

  const { setAddUserToken } = useUserStore();

  useLayoutEffect(() => {
    const checkToken = async () => {
      if (params) {
        const newToken = await setTokenInCookies(params);
        setAddUserToken(newToken);
        setToken(newToken);
      }
    };
    checkToken();
  }, [params, setAddUserToken]);

  useLayoutEffect(() => {
    if (token) {
      redirect("/schedule/monthly");
    }
  }, [token]);

  return null;
}
