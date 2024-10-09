"use server";

import { InstructorBasicProps, InstructorProps } from "@types";
import { Fetch } from "@utils";

export async function createInstructor(
  data: InstructorBasicProps
): Promise<{ success: boolean; message: string; data?: InstructorProps }> {
  const result = await Fetch<{
    success: boolean;
    message: string;
    data: InstructorProps;
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
