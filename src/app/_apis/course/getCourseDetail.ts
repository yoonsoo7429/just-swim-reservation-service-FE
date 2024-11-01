"use server";

import { notFound } from "next/navigation";

import { CourseDetailProps } from "@types";
import { Fetch } from "@utils";

export async function getCourseDetail(
  courseId: number
): Promise<CourseDetailProps | null> {
  const result = await Fetch<{ success: boolean; data: CourseDetailProps }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`,
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });

  if (result.success) {
    return result.data;
  } else {
    return notFound();
  }
}
