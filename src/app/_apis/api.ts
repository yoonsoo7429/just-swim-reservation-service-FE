"use server";

import { HTTP_METHODS_TYPE } from "@types";
import { cookies } from "next/headers";

type Response<T> = {
  status: number;
  data: T;
};

const api = async <T>(
  url: string,
  method: HTTP_METHODS_TYPE,
  options?: RequestInit
): Promise<Response<T>> => {
  const base = `${process.env.NEXT_PUBLIC_API_URL}`;
  const authorizationToken = cookies().get("token")?.value;
  const URL = `${base}${url}`;
  const defaultOptions: RequestInit = {
    method: method,
    headers: {
      Authorization: authorizationToken ? `Bearer ${authorizationToken}` : "",
      ...options?.headers,
    },
    credentials: "include",
  };
  const finalOptions = { ...defaultOptions, ...options };

  try {
    const response = await fetch(URL, finalOptions);
    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    // redirect('/not-found');
    throw new Error("Redirect to not-found pages");
  }
};

export default api;
