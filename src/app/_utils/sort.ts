import { CourseProps } from "@types";

export function sortSchedule(a: CourseProps, b: CourseProps) {
  const aTime = parseInt(a.courseStartTime.split(":")[0]);
  const bTime = parseInt(b.courseStartTime.split(":")[0]);

  if (aTime > bTime) {
    return 1;
  } else {
    return -1;
  }
}
