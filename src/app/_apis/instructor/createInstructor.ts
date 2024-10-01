"use server";

import { InstructorProps } from "@types";
import { Fetch } from "@utils";

export async function createInstructor(
  data: InstructorProps
): Promise<{ success: boolean; message: string; data: {} }> {
  const result = await Fetch<{
    success: boolean;
    message: string;
    data: {};
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/instructor`,
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
