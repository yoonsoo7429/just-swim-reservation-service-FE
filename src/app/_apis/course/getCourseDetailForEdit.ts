"use server";

import { notFound } from "next/navigation";

import { CourseDetailProps, CourseDetailForEditProps } from "@types";
import { Fetch } from "@utils";

export async function getCourseDetailForEdit(
  courseId: number
): Promise<CourseDetailForEditProps | null> {
  const result = await Fetch<{ success: boolean; data: CourseDetailProps }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`,
    header: {
      token: true,
      json: true,
      credential: true,
    },
  });

  if (result.success) {
    const { courseStartTime, courseEndTime, courseCapacity, ...rest } =
      result.data;
    const courseTime = `${courseStartTime}-${courseEndTime}`;
    const courseCapacityStr = courseCapacity.toString();
    return { ...rest, courseTime, courseCapacity: courseCapacityStr };
  } else {
    return notFound();
  }
}
