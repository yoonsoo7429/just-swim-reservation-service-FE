import Image from "next/image";

import { IconRepeat, NoProfileImage } from "@assets";
import { CourseProps } from "@types";
import { numberFormat } from "@utils";

import styled from "./styles.module.scss";
import { DAY_ENG_TO_KOR, RANDOM_COLOR } from "@data";

const primaryColor = "#3498db";

export function CourseDetailItem({ schedule }: { schedule: CourseProps }) {
  const startTime = parseInt(schedule.courseStartTime.split(":")[0]);

  // 중복된 수강생 제거
  const uniqueStudents = Array.from(
    new Set(schedule.lecture.map((lecture) => lecture.user.userId))
  ).map((userId) =>
    schedule.lecture.find((lecture) => lecture.user.userId === userId)
  );

  const studentCount = uniqueStudents.length;
  const capacityInfo = `${studentCount}명/${schedule.courseCapacity}명`;

  // 요일 변환
  const translatedDays = schedule.courseDays
    .split(",")
    .map((day) => DAY_ENG_TO_KOR[day.trim() as keyof typeof DAY_ENG_TO_KOR]);

  // 랜덤 색
  const getRandomColor = RANDOM_COLOR();

  return (
    <div className={styled.container}>
      <div className={styled.time_info}>
        <span className={styled.meridiem}>
          {startTime < 12 ? "오전" : "오후"}
        </span>
        <span className={styled.start_time}>{numberFormat(startTime)}시</span>
      </div>
      <div
        className={styled.content}
        style={{ boxShadow: `3px 0 0 0 ${getRandomColor} inset` }}
      >
        <div className={styled.main_info}>
          <div className={styled.title_info}>
            <p className={styled.class_name} style={{ color: getRandomColor }}>
              {schedule.courseTitle}
            </p>
            <p className={styled.class_info}>
              {schedule.courseStartTime}-{schedule.courseEndTime}
            </p>
          </div>

          <div className={styled.student_info}>
            {uniqueStudents.map((lecture, index) => (
              <div key={index} className={styled.student}>
                <Image
                  src={
                    lecture?.user.customer?.customerProfileImage
                      ? lecture.user.customer.customerProfileImage
                      : NoProfileImage
                  }
                  alt={`${lecture?.user.userId}`}
                  width={20}
                  height={20}
                />
              </div>
            ))}
            {schedule.lecture && schedule.lecture.length !== 0 ? (
              <div
                className={styled.student_count}
                style={{ color: `${primaryColor}` }}
              >
                <p>{capacityInfo}</p>
              </div>
            ) : (
              <div className={styled.empty_student}>
                <p>수강생이 없습니다</p>
              </div>
            )}
          </div>
        </div>
        <div className={styled.extra_info}>
          <p className={styled.class_day}>
            <IconRepeat width={14} height={14} />
            <span>매주</span>
            <span>
              {translatedDays.join(", ")}
              <span>요일</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
