"use server";

import { CustomerBasicProps, CustomerProps } from "@types";
import { Fetch } from "@utils";

export async function createCustomer(
  data: CustomerBasicProps
): Promise<{ success: boolean; message: string; data?: CustomerProps }> {
  try {
    const result = await Fetch<{
      success: boolean;
      message: string;
      data: CustomerProps;
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

    if (!result || typeof result.success !== "boolean") {
      return {
        success: false,
        message: "잘못된 응답 형식입니다.",
      };
    }

    return result;
  } catch (error) {
    // 오류 처리
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "서버 오류가 발생했습니다.",
    };
  }
}
