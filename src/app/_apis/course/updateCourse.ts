"use server";

import { CourseBasicProps } from "@types";
import { Fetch } from "@utils";

export async function updateCourse(
  data: CourseBasicProps,
  id: string
): Promise<{ success: boolean; message: string; data: null }> {
  const result = await Fetch<{
    success: boolean;
    message: string;
    data: null;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/course/${id}`,
    method: "PATCH",
    header: {
      token: true,
      json: true,
      credential: true,
    },
    body: data,
  });

  return result;
}
