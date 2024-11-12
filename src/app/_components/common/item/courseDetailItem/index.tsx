import Image from "next/image";

import { IconRepeat, NoProfileImage } from "@assets";
import { CourseProps } from "@types";
import { numberFormat } from "@utils";

import styled from "./styles.module.scss";
import { DAY_ENG_TO_KOR } from "@data";

export function CourseDetailItem({
  schedule,
  selectedDate,
}: {
  schedule: CourseProps;
  selectedDate: string;
}) {
  const startTime = parseInt(schedule.courseStartTime.split(":")[0]);

  const members = schedule.lecture.filter(
    (lecture) => lecture.lectureDate === selectedDate.replace(/\./g, "-")
  );

  const memberCount = members.length;
  const capacityInfo = `${memberCount}명/${schedule.courseCapacity}명`;

  // 요일 변환
  const translatedDays = schedule.courseDays
    .split(",")
    .map((day) => DAY_ENG_TO_KOR[day.trim() as keyof typeof DAY_ENG_TO_KOR]);

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
        style={{ boxShadow: `3px 0 0 0 ${schedule.courseColor} inset` }}
      >
        <div className={styled.main_info}>
          <div className={styled.title_info}>
            <p
              className={styled.class_name}
              style={{ color: `${schedule.courseColor}` }}
            >
              {schedule.courseTitle}
            </p>
            <p className={styled.class_info}>
              {schedule.courseStartTime}-{schedule.courseEndTime}
            </p>
          </div>

          <div className={styled.member_info}>
            {members.map((lecture, index) => (
              <div key={index} className={styled.member}>
                <Image
                  src={
                    lecture?.user.customer[0]?.customerProfileImage
                      ? lecture.user.customer[0].customerProfileImage
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
                className={styled.member_count}
                style={{ color: `${schedule.courseColor}` }}
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
