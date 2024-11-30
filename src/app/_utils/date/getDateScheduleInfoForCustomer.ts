"use server";

import { getInProgressScheduleForCustomer, getMyProfile } from "@apis";
import { sortScheduleForCustomer } from "@utils";
import { ScheduleSummaryForCustomer } from "@types";
import { WEEK_DAYS, WEEK_DAYS_TO_ENG } from "@data";

import { getMonth, getToday } from "./getDateInfo";

export async function getMonthlyScheduleInfoForCustomer(
  month: string
): Promise<ScheduleSummaryForCustomer[] | []> {
  const result = [];
  const thisMonthInfo = getMonth();
  const scheduleInfo = (await getInProgressScheduleForCustomer()) || [];

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
    const nowInfo: ScheduleSummaryForCustomer = {
      date: thisMonthInfo[i],
      day: WEEK_DAYS[i % 7],
      lectures: [],
    };

    for (const lecture of scheduleInfo) {
      const lectureDate = lecture.lectureDate;

      if (
        lectureDate >= formattedStartOfMonth &&
        lectureDate <= formattedEndOfMonth &&
        new Date(lectureDate).toDateString() ===
          new Date(thisMonthInfo[i]).toDateString()
      ) {
        nowInfo.lectures.push(lecture);
      }

      nowInfo.lectures.sort(sortScheduleForCustomer);
    }

    nowInfo.lectures.sort(sortScheduleForCustomer);
    result.push(nowInfo);
  }

  return result;
}

export async function getTodayScheduleCountForCustomer() {
  const today = getToday();
  const month = today.getMonth().toString();
  const scheduleInfo = await getMonthlyScheduleInfoForCustomer(month);

  return scheduleInfo[today.getDay()]?.lectures.length;
}
