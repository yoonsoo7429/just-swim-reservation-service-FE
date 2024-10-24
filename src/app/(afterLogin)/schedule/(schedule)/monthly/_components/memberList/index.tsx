"use client";

import Image from "next/image";
import { CourseForMemberInfoProps, CourseProps, ScheduleSummary } from "@types";
import { NoProfileImage } from "@assets";
import styled from "./styles.module.scss";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { WEEK_DAYS_TO_ENG } from "@data";

export function MemberList({
  members,
  userType,
  courses,
  onDateChange,
}: {
  members: CourseForMemberInfoProps[];
  userType: string | null;
  courses: ScheduleSummary[];
  onDateChange: (lectureId: string, newDate: string) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getAvailableDates = (userId: string) => {
    const availableCourses = courses
      .flatMap((schedule) =>
        schedule.courses.filter((course) => course.user.userId === userId)
      )
      .filter(
        (course, index, self) =>
          index === self.findIndex((c) => c.courseId === course.courseId)
      );

    const availableDates: Date[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    availableCourses.forEach((course) => {
      if (course.lecture.length > 0) {
        course.lecture.forEach((lecture) => {
          if (lecture.lectureDate) {
            const lectureDate = new Date(lecture.lectureDate);
            lectureDate.setHours(0, 0, 0, 0);
            if (lectureDate > today) {
              availableDates.push(lectureDate);
            }
          }
        });
      } else {
        const courseDays = course.courseDays
          .split(",")
          .map((day) => day.trim());

        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dayOfWeek = date.getDay();

          if (courseDays.includes(WEEK_DAYS_TO_ENG[dayOfWeek])) {
            availableDates.push(date);
          }
        }
      }
    });

    return (date: Date) => {
      return (
        date > today &&
        availableDates.some(
          (availableDate) =>
            availableDate.getTime() === date.setHours(0, 0, 0, 0)
        )
      );
    };
  };

  const handleMoveSlot = (lectureId: string, courseId: string) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];

      const course = courses
        .flatMap((schedule) => schedule.courses)
        .find((course) => course.courseId === courseId);

      if (course) {
        const courseCapacity = course.courseCapacity;
        const membersNum = course.lecture.length;
        if (courseCapacity > membersNum) {
          onDateChange(lectureId, formattedDate);
          setSelectedDate(null);
        } else {
          alert("해당 강좌에 빈 자리가 없습니다. 다른 강좌로 이동해 주세요.");
        }
      }
    }
  };

  return (
    <div className={styled.memberList}>
      <ul>
        {members.map((member) => (
          <div key={member.lectureId} className={styled.memberItem}>
            <Image
              src={
                member.customerProfileImage
                  ? member.customerProfileImage
                  : NoProfileImage
              }
              alt={`${member?.userId}`}
              width={30}
              height={30}
            />
            <div className={styled.memberInfo}>
              <p>{member.customerName}</p>
            </div>

            {userType === "instructor" ? (
              <div className={styled.lectureDateInput}>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy.MM.dd"
                  className={styled.lectureDatePicker}
                  filterDate={getAvailableDates(member.instructorUserId)}
                />
                <button
                  onClick={() =>
                    handleMoveSlot(member.lectureId, member.courseId)
                  }
                >
                  Move Slot
                </button>
              </div>
            ) : userType === "customer" ? (
              <div className={styled.moveSlotButton}>
                <button>Move to Available Slot</button>
              </div>
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
}
