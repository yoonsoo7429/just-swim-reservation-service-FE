"use server";

import { updateCourse, getInProgressScheduleForInstructor } from "@apis";
import { CourseBasicProps } from "@types";
import { notFound, redirect } from "next/navigation";

export async function modifyFormAction(data: CourseBasicProps, id: string) {
  const schedules = (await getInProgressScheduleForInstructor()) || [];

  const errors = {
    title: "",
    duplicate: "",
  };
  let valid = true;
  const inputStart = parseInt(data.courseStartTime.split(":").join(""));
  const inputEnd = parseInt(data.courseEndTime.split(":").join(""));
  const inputDays = data.courseDays.split(",");

  for (const schedule of schedules) {
    if (schedule.courseId === id) {
      continue;
    }

    if (data.courseTitle === schedule.courseTitle) {
      valid = false;
      errors.title = "중복된 강의명이 존재합니다.";
    }

    const targetStart = parseInt(schedule.courseStartTime.split(":").join(""));
    const targetEnd = parseInt(schedule.courseEndTime.split(":").join(""));
    const targetDays = schedule.courseDays.split(",");

    for (const day of inputDays) {
      if (schedule.courseId === id) {
        continue;
      }

      if (
        targetDays.includes(day) &&
        ((inputStart > targetStart && inputStart < targetEnd) ||
          (inputEnd > targetStart && inputEnd < targetEnd) ||
          (inputStart < targetStart && inputEnd > targetEnd))
      ) {
        valid = false;
        errors.duplicate = "같은 일정으로 등록된 수업이 있습니다.";
      }
    }
  }

  if (!valid) {
    return errors;
  }

  const result = await updateCourse(data, id);

  if (result.success) {
    redirect(`/schedule/add/complete/${id}`);
  } else {
    return notFound();
  }
}
