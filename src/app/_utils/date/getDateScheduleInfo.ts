"use server";

import { getInProgressSchedule, getMyProfile } from "@apis";
import { sortSchedule } from "@utils";
import { ScheduleSummary } from "@types";
import { WEEK_DAYS, WEEK_DAYS_TO_ENG } from "@data";

import { getMonth, getToday } from "./getDateInfo";

export async function getMonthlyScheduleInfo(
  month: string
): Promise<ScheduleSummary[] | []> {
  const result = [];
  const thisMonthInfo = getMonth();
  const scheduleInfo = (await getInProgressSchedule()) || [];

  const userInfo = await getMyProfile();
  const userType = userInfo?.data.data.userType ?? null;

  const today = new Date();
  const year = new Date().getFullYear();
  const currentMonth = today.getMonth();
  const startOfMonth = new Date(Date.UTC(year, currentMonth, 1));
  const endOfMonth = new Date(Date.UTC(year, currentMonth + 1, 0));

  const formattedStartOfMonth = `${year}-${String(currentMonth + 1).padStart(2, "0")}-${String(startOfMonth.getDate()).padStart(2, "0")}`;
  const formattedEndOfMonth = `${year}-${String(currentMonth + 1).padStart(2, "0")}-${String(endOfMonth.getDate()).padStart(2, "0")}`;

  for (let i = 0; i < thisMonthInfo.length; i++) {
    const nowInfo: ScheduleSummary = {
      date: thisMonthInfo[i],
      day: WEEK_DAYS[i % 7],
      courses: [],
    };

    for (const course of scheduleInfo) {
      const selectedDays = course.courseDays.split(",");

      const filteredCourses = course.lecture.filter((lecture) => {
        const lectureDate = lecture.lectureDate;
        return (
          lectureDate >= formattedStartOfMonth &&
          lectureDate <= formattedEndOfMonth &&
          new Date(lectureDate).toDateString() ===
            new Date(thisMonthInfo[i]).toDateString()
        );
      });

      const courseData = {
        ...course,
        userType,
        lecture: filteredCourses,
      };

      if (
        filteredCourses.length > 0 ||
        selectedDays.includes(WEEK_DAYS_TO_ENG[i % 7])
      ) {
        nowInfo.courses.push(courseData);
      }
    }

    nowInfo.courses.sort(sortSchedule);
    result.push(nowInfo);
  }

  return result;
}

export async function getTodayScheduleCount() {
  const today = getToday();
  const month = today.getMonth().toString();
  const scheduleInfo = await getMonthlyScheduleInfo(month);

  return scheduleInfo[today.getDay()]?.courses.length;
}
