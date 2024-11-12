"use client";

import Image from "next/image";

import { CourseDetailProps, ProfileWithTypeProps } from "@types";

import styled from "./styles.module.scss";
import { DAY_ENG_TO_KOR } from "@data";

export function Main({
  courseData,
  instructorData,
}: {
  courseData: CourseDetailProps;
  instructorData: ProfileWithTypeProps;
}) {
  // 요일 변환
  const translatedDays = courseData.courseDays
    .split(",")
    .map((day) => DAY_ENG_TO_KOR[day.trim() as keyof typeof DAY_ENG_TO_KOR])
    .join(",");

  return (
    <div className={styled.content}>
      <div className={styled.title_wrapper}>
        <p className={styled.title}>{courseData.courseTitle}</p>
      </div>
      <div className={styled.instructor}>
        <Image
          src={
            instructorData.instructor[0].instructorProfileImage ||
            "/assets/profile1.png"
          }
          alt={`${instructorData.instructor[0].instructorName}`}
          width={24}
          height={24}
        />
        <p>
          <span>{instructorData.instructor[0].instructorName}</span> 강사님 수업
        </p>
      </div>
      <div className={styled.courseInfo1}>
        <p className={styled.days}>{translatedDays}</p>
        <p className={styled.time}>{courseData.courseStartTime}</p>
        <span>-</span>
        <p className={styled.time}>{courseData.courseEndTime}</p>
      </div>
      <div className={styled.courseInfo2}>
        <p className={styled.capacity}>
          참여가능 인원: {courseData.courseCapacity}
        </p>
        <div className={styled.color}>
          <div
            className={styled.color_sample}
            style={{ backgroundColor: courseData.courseColor }}
          />
          <p>{courseData.courseColor}</p>
        </div>
      </div>
    </div>
  );
}
