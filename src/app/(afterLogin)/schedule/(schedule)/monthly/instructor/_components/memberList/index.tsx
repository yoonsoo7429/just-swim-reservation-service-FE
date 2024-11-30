"use client";

import Image from "next/image";
import {
  CourseForMemberInfoProps,
  CourseProps,
  ScheduleSummaryForInstructor,
} from "@types";
import { NoProfileImage } from "@assets";
import styled from "./styles.module.scss";
import DatePicker from "react-datepicker";
import { useState } from "react";
import { WEEK_DAYS_TO_ENG } from "@data";
import { formAction } from "./action";

export function MemberList({
  members,
  userType,
  courses,
  selectedDate,
  onDateChange,
}: {
  members: CourseForMemberInfoProps[];
  userType: string | null;
  courses: ScheduleSummaryForInstructor[];
  selectedDate: string;
  onDateChange: (lectureId: string, newDate: string) => void;
}) {
  const [selectedEditDate, setSelectedEditDate] = useState<Date | null>(null);
  const [availableCourseList, setAvailableCourseList] = useState<CourseProps[]>(
    []
  );
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<{
    [key: string]: boolean;
  }>({});

  // 오늘 날짜
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const courseDate = new Date(selectedDate);
  courseDate.setHours(0, 0, 0, 0);

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

    availableCourses.forEach((course) => {
      const membersNum = course.lecture.length;

      // 강좌 수용 가능 여부 확인
      if (course.courseCapacity > membersNum) {
        if (course.lecture.length > 0) {
          course.lecture.forEach((lecture) => {
            if (lecture.lectureDate) {
              const lectureDate = new Date(lecture.lectureDate);
              lectureDate.setHours(0, 0, 0, 0);

              const threeDaysLater = new Date(today);
              threeDaysLater.setDate(today.getDate() + 3);
              threeDaysLater.setHours(0, 0, 0, 0);

              if (
                courseDate.getTime() === today.getTime() &&
                lectureDate >= threeDaysLater
              ) {
                availableDates.push(lectureDate);
              } else if (courseDate.getTime() !== today.getTime()) {
                if (lectureDate > today) {
                  availableDates.push(lectureDate);
                }
              }
            }
          });
        } else {
          const courseDays = course.courseDays
            .split(",")
            .map((day) => day.trim());

          for (let i = 0; i < 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            date.setHours(0, 0, 0, 0);
            const dayOfWeek = date.getDay();

            const threeDaysLater = new Date(today);
            threeDaysLater.setDate(today.getDate() + 3);
            threeDaysLater.setHours(0, 0, 0, 0);

            if (
              courseDate.getTime() === today.getTime() &&
              date >= threeDaysLater &&
              courseDays.includes(WEEK_DAYS_TO_ENG[dayOfWeek])
            ) {
              availableDates.push(date);
            } else if (
              courseDate.getTime() !== today.getTime() &&
              date > today &&
              courseDays.includes(WEEK_DAYS_TO_ENG[dayOfWeek])
            ) {
              availableDates.push(date);
            }
          }
        }
      }
    });

    return (date: Date) => {
      date.setHours(0, 0, 0, 0);
      return (
        date > today &&
        availableDates.some(
          (availableDate) =>
            availableDate.getTime() === date.setHours(0, 0, 0, 0)
        )
      );
    };
  };

  const handleDateChange = (date: Date | null, memberId: string) => {
    setSelectedEditDate(date);
    if (date) {
      const filteredCourses = courses
        .flatMap((schedule) => schedule.courses)
        .filter((course) => {
          const courseDays = course.courseDays
            .split(",")
            .map((day) => day.trim());
          const dayOfWeek = date.getDay();
          return (
            course.user.userId === memberId &&
            (course.lecture.some(
              (lecture) =>
                lecture.lectureDate === date.toISOString().split("T")[0]
            ) ||
              courseDays.includes(WEEK_DAYS_TO_ENG[dayOfWeek]))
          );
        });
      const uniqueCourses = Array.from(
        new Map(
          filteredCourses.map((course) => [course.courseId, course])
        ).values()
      );

      setAvailableCourseList(uniqueCourses);
    } else {
      setAvailableCourseList([]);
    }
  };

  const handleMoveSlot = async (lectureId: string, courseId: string) => {
    if (selectedEditDate) {
      const formattedDate = new Date(
        selectedEditDate.getTime() + 9 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0];

      const course = courses
        .flatMap((schedule) => schedule.courses)
        .find((course) => course.courseId === courseId);

      if (course) {
        const courseCapacity = course.courseCapacity;
        const membersNum = course.lecture.length;
        if (courseCapacity > membersNum) {
          const data = {
            courseId: Number(course.courseId),
            lectureDate: formattedDate,
            lectureStartTime: course.courseStartTime,
            lectureEndTime: course.courseEndTime,
          };

          await formAction(data, lectureId);
          onDateChange(lectureId, formattedDate);

          setSelectedEditDate(null);
        } else {
          alert("해당 강좌에 빈 자리가 없습니다. 다른 날짜를 선택해주세요.");
        }
      }
    }
  };

  const handleCancel = (memberId: string) => {
    setSelectedEditDate(null);
    setSelectedCourse(null);
    setShowDatePicker((prev) => ({
      ...prev,
      [memberId]: false,
    }));
  };

  const toggleDatePicker = (memberId: string) => {
    setShowDatePicker((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
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

            {userType === "instructor" || userType === "customer" ? (
              <div className={styled.lectureDateInput}>
                {showDatePicker[member.lectureId] ? (
                  <>
                    <DatePicker
                      selected={selectedEditDate}
                      onChange={(date) =>
                        handleDateChange(date, member.instructorUserId)
                      }
                      dateFormat="yyyy.MM.dd"
                      className={styled.lectureDatePicker}
                      filterDate={getAvailableDates(member.instructorUserId)}
                    />
                    {selectedEditDate && availableCourseList.length > 0 && (
                      <select
                        value={selectedCourse || ""}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className={styled.courseTimeSelect}
                      >
                        <option value="" disabled>
                          시간을 선택해주세요
                        </option>
                        {availableCourseList.map((course) => (
                          <option key={course.courseId} value={course.courseId}>
                            {course.courseTitle} : {course.courseStartTime} -{" "}
                            {course.courseEndTime}
                          </option>
                        ))}
                      </select>
                    )}
                    <div className={styled.buttonContainer}>
                      <button
                        onClick={() =>
                          handleMoveSlot(member.lectureId, selectedCourse || "")
                        }
                        className={styled.moveSlotButton}
                      >
                        변경 완료
                      </button>
                      <button
                        onClick={() => handleCancel(member.lectureId)}
                        className={styled.cancelButton}
                      >
                        취소
                      </button>
                    </div>
                  </>
                ) : (
                  courseDate >= today && (
                    <button
                      onClick={() => toggleDatePicker(member.lectureId)}
                      className={styled.dateChangeButton}
                    >
                      일정 변경
                    </button>
                  )
                )}
              </div>
            ) : null}
          </div>
        ))}
      </ul>
    </div>
  );
}
