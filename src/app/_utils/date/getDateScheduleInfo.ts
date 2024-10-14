"use server";

import { unstable_cache } from "next/cache";

import { getCachedInProgressSchedule } from "@apis";
import { sortSchedule } from "@utils";
import { ScheduleSummary } from "@types";
import { WEEK_DAYS } from "@data";

import { getMonth, getToday } from "./getDateInfo";

async function getMonthlyScheduleInfo(
  month: string
): Promise<ScheduleSummary[] | []> {
  const result = [];

  const thisMonthInfo = getMonth();
  const scheduleInfo = (await getCachedInProgressSchedule()) || [];

  for (let i = 0; i < thisMonthInfo.length; i++) {
    const nowInfo: ScheduleSummary = {
      date: thisMonthInfo[i],
      day: WEEK_DAYS[i % 7],
      courses: [],
    };

    for (const course of scheduleInfo) {
      const filteredCourses = course.lecture.filter((lecture) => {
        return (
          new Date(lecture.lectureDate).toDateString() ===
          new Date(thisMonthInfo[i]).toDateString()
        );
      });

      if (filteredCourses.length > 0) {
        const courseData = {
          ...course,
          course: filteredCourses,
        };

        nowInfo.courses.push(courseData);
      }
    }

    nowInfo.courses.sort(sortSchedule);
    result.push(nowInfo);
  }

  return result;
}

export async function getCachedMonthlyScheduleInfo(month: string) {
  const cachedData = unstable_cache(
    getMonthlyScheduleInfo,
    ["monthly-schedule"],
    {
      tags: ["schedule", `schedule-${month}`],
      revalidate: 60,
    }
  );

  return cachedData(month);
}

export async function getTodayScheduleCount() {
  const today = getToday();
  const month = today.getMonth().toString();
  const scheduleInfo = await getMonthlyScheduleInfo(month);

  return scheduleInfo[today.getDay()].courses.length;
}
