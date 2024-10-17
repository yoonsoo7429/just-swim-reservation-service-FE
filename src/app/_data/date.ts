export const WEEK_DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const WEEK_DAYS_TO_ENG = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export const DAY_KOR_TO_ENG = {
  월: "Monday",
  화: "Tuesday",
  수: "Wednesday",
  목: "Thursday",
  금: "Friday",
  토: "Saturday",
  일: "Sunday",
} as const;

export const DAY_ENG_TO_KOR = {
  Monday: "월",
  Tuesday: "화",
  Wednesday: "수",
  Thursday: "목",
  Friday: "금",
  Saturday: "토",
  Sunday: "일",
} as const;
