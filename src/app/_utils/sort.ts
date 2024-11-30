import { CourseProps, LectureProps } from "@types";

export function sortScheduleForInstructor(a: CourseProps, b: CourseProps) {
  const aTime = parseInt(a.courseStartTime.split(":")[0]);
  const bTime = parseInt(b.courseStartTime.split(":")[0]);

  if (aTime > bTime) {
    return 1;
  } else {
    return -1;
  }
}

export function sortScheduleForCustomer(a: LectureProps, b: LectureProps) {
  const aTime = parseInt(a.lectureStartTime.split(":")[0]);
  const bTime = parseInt(b.lectureStartTime.split(":")[0]);

  if (aTime > bTime) {
    return 1;
  } else {
    return -1;
  }
}
