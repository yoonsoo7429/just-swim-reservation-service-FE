"use server";

import { notFound } from "next/navigation";

import { LectureProps } from "@types";
import { Fetch } from "@utils";

export async function getInProgressScheduleForCustomer(): Promise<
  LectureProps[] | null
> {
  const result = await Fetch<{ success: boolean; data: LectureProps[] }>({
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
