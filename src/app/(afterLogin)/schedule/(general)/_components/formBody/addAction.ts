"use server";

import { createCourse, getInProgressSchedule } from "@apis";
import { CourseBasicProps } from "@types";
import { notFound, redirect } from "next/navigation";

export async function addFormAction(data: CourseBasicProps) {
  const schedules = (await getInProgressSchedule()) || [];

  const errors = {
    title: "",
    duplicate: "",
  };
  let valid = true;
  const inputStart = parseInt(data.courseStartTime.split(":").join(""));
  const inputEnd = parseInt(data.courseEndTime.split(":").join(""));

  for (const schedule of schedules) {
    if (data.courseTitle === schedule.courseTitle) {
      valid = false;
      errors.title = "중복된 강의명이 존재합니다.";
    }

    const targetStart = parseInt(schedule.courseStartTime.split(":").join(""));
    const targetEnd = parseInt(schedule.courseEndTime.split(":").join(""));

    for (const day of data.courseDays) {
      if (
        schedule.courseDays.includes(day) &&
        ((inputStart >= targetStart && inputStart <= targetEnd) ||
          (inputEnd >= targetStart && inputEnd <= targetEnd))
      ) {
        valid = false;
        errors.duplicate = "같은 일정으로 등록된 수업이 있습니다.";
      }
    }
  }

  if (!valid) {
    return errors;
  }

  const result = await createCourse(data);

  if (result.success) {
    redirect(`/schedule/add/complete/${result.data.courseId}`);
  } else {
    return notFound();
  }
}