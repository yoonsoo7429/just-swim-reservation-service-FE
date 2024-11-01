"use client";

import Image from "next/image";

import { CourseDetailProps, ProfileWithTypeProps } from "@types";

import styled from "./styles.module.scss";

export function Main({
  courseData,
  instructorData,
}: {
  courseData: CourseDetailProps;
  instructorData: ProfileWithTypeProps;
}) {
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
    </div>
  );
}
