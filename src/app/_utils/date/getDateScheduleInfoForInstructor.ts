"use server";

import { getInProgressScheduleForInstructor, getMyProfile } from "@apis";
import { sortScheduleForInstructor } from "@utils";
import { ScheduleSummaryForInstructor } from "@types";
import { WEEK_DAYS, WEEK_DAYS_TO_ENG } from "@data";

import { getMonth, getToday } from "./getDateInfo";

export async function getMonthlyScheduleInfoForInstructor(
  month: string
): Promise<ScheduleSummaryForInstructor[] | []> {
  const result = [];
  const thisMonthInfo = getMonth();
  const scheduleInfo = (await getInProgressScheduleForInstructor()) || [];

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
    const nowInfo: ScheduleSummaryForInstructor = {
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

    nowInfo.courses.sort(sortScheduleForInstructor);
    result.push(nowInfo);
  }

  return result;
}

export async function getTodayScheduleCountForInstructor() {
  const today = getToday();
  const month = today.getMonth().toString();
  const scheduleInfo = await getMonthlyScheduleInfoForInstructor(month);

  return scheduleInfo[today.getDay()]?.courses.length;
}
