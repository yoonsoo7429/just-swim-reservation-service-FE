"use server";

import { notFound } from "next/navigation";

import { CourseProps } from "@types";
import { Fetch } from "@utils";

export async function getInProgressScheduleForInstructor(): Promise<
  CourseProps[] | null
> {
  const result = await Fetch<{ success: boolean; data: CourseProps[] }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/schedule`,
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
