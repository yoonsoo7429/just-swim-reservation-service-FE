"use server";

import { CustomerProps } from "@types";
import { Fetch } from "@utils";

export async function createCustomer(
  data: CustomerProps
): Promise<{ success: boolean; message: string; data: {} }> {
  const result = await Fetch<{
    success: boolean;
    message: string;
    data: {};
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/customer`,
    method: "POST",
    header: {
      token: true,
      json: true,
      credential: true,
    },
    body: data,
  });

  return result;
}
