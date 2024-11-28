"use server";

import {
  getInProgressScheduleForInstructor,
  getInProgressScheduleForCustomer,
  getMyProfile,
} from "@apis";
import { sortScheduleForCustomer, sortScheduleForInstructor } from "@utils";
import {
  LectureProps,
  ScheduleSummaryForCustomer,
  ScheduleSummaryForInstructor,
} from "@types";
import { WEEK_DAYS, WEEK_DAYS_TO_ENG } from "@data";

import { getMonth, getToday } from "./getDateInfo";

export async function getMonthlyScheduleInfo(
  month: string
): Promise<ScheduleSummaryForInstructor[] | ScheduleSummaryForCustomer[] | []> {
  const resultForInstructor: ScheduleSummaryForInstructor[] = [];
  const resultForCustomer: ScheduleSummaryForCustomer[] = [];
  const thisMonthInfo = getMonth();
  const scheduleInfoForInstructor =
    (await getInProgressScheduleForInstructor()) || [];
  const scheduleInfoForCustomer =
    (await getInProgressScheduleForCustomer()) || [];

  const userInfo = await getMyProfile();
  const userType = userInfo?.data.data.userType ?? null;

  const today = new Date();
  const year = new Date().getFullYear();
  const currentMonth = today.getMonth();
  const startOfMonth = new Date(Date.UTC(year, currentMonth, 1));
  const endOfMonth = new Date(Date.UTC(year, currentMonth + 1, 0));

  const formattedStartOfMonth = `${year}-${String(currentMonth + 1).padStart(2, "0")}-${String(startOfMonth.getDate()).padStart(2, "0")}`;
  const formattedEndOfMonth = `${year}-${String(currentMonth + 1).padStart(2, "0")}-${String(endOfMonth.getDate()).padStart(2, "0")}`;

  // 강사
  if (userType === "instructor") {
    for (let i = 0; i < thisMonthInfo.length; i++) {
      const nowInfo: ScheduleSummaryForInstructor = {
        date: thisMonthInfo[i],
        day: WEEK_DAYS[i % 7],
        data: [],
      };

      for (const course of scheduleInfoForInstructor) {
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
          nowInfo.data.push(courseData);
        }
      }

      nowInfo.data.sort(sortScheduleForInstructor);
      resultForInstructor.push(nowInfo);
    }
    return resultForInstructor;
  }

  // 수강생
  if (userType === "customer") {
    for (let i = 0; i < thisMonthInfo.length; i++) {
      const nowInfo: ScheduleSummaryForCustomer = {
        date: thisMonthInfo[i],
        day: WEEK_DAYS[i % 7],
        data: [],
      };

      for (const lecture of scheduleInfoForCustomer) {
        // 수강생의 강의 날짜와 월의 날짜 범위 확인
        const lectureDate = lecture.lectureDate;

        if (
          lectureDate >= formattedStartOfMonth &&
          lectureDate <= formattedEndOfMonth &&
          new Date(lectureDate).toDateString() ===
            new Date(thisMonthInfo[i]).toDateString()
        ) {
          const lectureData: LectureProps = {
            ...lecture,
            userType,
          };
          nowInfo.data.push(lectureData);
        }
      }

      nowInfo.data.sort(sortScheduleForCustomer);
      resultForCustomer.push(nowInfo);
    }
    return resultForCustomer;
  }

  return [];
}

export async function getTodayScheduleCount() {
  const today = getToday();
  const month = today.getMonth().toString();
  const scheduleInfo = await getMonthlyScheduleInfo(month);

  return scheduleInfo[today.getDay()].data.length;
}
