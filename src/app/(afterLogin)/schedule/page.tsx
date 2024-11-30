"use client";

import { useUserStore } from "@store";
import { getTokenInCookies, setTokenInCookies } from "@utils";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function Schedule() {
  const params = useSearchParams().get("token");
  const [token, setToken] = useState<string>();
  const router = useRouter();

  const { setAddUserToken } = useUserStore();

  useEffect(() => {
    const checkCookies = async () => {
      const isLogin = await getTokenInCookies();
      if (!isLogin) {
        return;
      } else {
        router.push("/schedule/monthly");
      }
    };
    checkCookies();
  }, [router]);

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
