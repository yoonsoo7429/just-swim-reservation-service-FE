"use server";

import { CourseBasicProps, CourseCreateProps } from "@types";
import { Fetch } from "@utils";

export async function createCourse(
  data: CourseBasicProps
): Promise<{ success: boolean; message: string; data: CourseCreateProps }> {
  const result = await Fetch<{
    success: boolean;
    message: string;
    data: CourseCreateProps;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/course`,
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
