"use client";

import { MouseEvent, TouchEvent, useRef, useState } from "react";

import { CourseProps, SelectedCourseProps } from "@types";
import { CourseDetailItem, Portal } from "@components";
import { randomId, throttle } from "@utils";
import { WEEK_DAYS } from "@data";

import styled from "./styles.module.scss";

export function CourseList({
  selectedDate,
  monthlyInfo,
  itemHeight,
  unshowClass,
}: {
  selectedDate: string;
  monthlyInfo: { date: string; day: string; courses: CourseProps[] }[];
  itemHeight: number;
  unshowClass: () => void;
}) {
  const date = new Date(selectedDate);

  const [movingCursorPositon, setMovingCursorPosition] = useState<number>(0);
  const startCursorPosition = useRef<number>(0);
  const startDrag = useRef<boolean>(false);

  const [selectedCourse, setSelectedCourse] = useState<SelectedCourseProps[]>(
    []
  );

  const [showMemberList, setShowMemberList] = useState<boolean>(false);

  const todayInfo = monthlyInfo.find((info) => info.date === selectedDate);
  const scheduleInfo = todayInfo?.courses || [];

  const handleDragStart = (event: MouseEvent<HTMLButtonElement>) => {
    startDrag.current = true;
    startCursorPosition.current = event.pageY;
  };

  const handleDragMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!startDrag.current) {
      return;
    }

    if (event.pageY - startCursorPosition.current <= 0) {
      return;
    }

    setMovingCursorPosition(event.pageY - startCursorPosition.current);
  };

  const handleDragEnd = () => {
    if (!startDrag.current) {
      return;
    }

    if (movingCursorPositon > 100) {
      unshowClass();
    }

    setMovingCursorPosition(0);
    startDrag.current = false;
  };

  const handleTouchStart = (event: TouchEvent<HTMLButtonElement>) => {
    startCursorPosition.current = event.targetTouches[0].pageY;
  };

  const handleTouchMove = (event: TouchEvent<HTMLButtonElement>) => {
    if (event.targetTouches[0].pageY - startCursorPosition.current <= 0) {
      return;
    }

    setMovingCursorPosition(
      event.targetTouches[0].pageY - startCursorPosition.current
    );
  };

  const handleTouchEnd = () => {
    if (movingCursorPositon > 100) {
      unshowClass();
    }

    setMovingCursorPosition(0);
  };

  const handleCourseClick = (lectures: CourseProps["lecture"]) => {
    const members = lectures.filter(
      (lecture) => lecture.lectureDate === selectedDate.replace(/\./g, "-")
    );
    console.log(members);
    if (showMemberList) {
      setShowMemberList(false);
      setSelectedCourse([]);
    } else {
      const membersDetail: SelectedCourseProps[] = members.map((lecture) => ({
        lectureId: lecture.lectureId,
        userId: lecture.user.userId,
        userType: lecture.user.userType,
        customerProfileImage: lecture.user.customer[0].customerProfileImage,
        customerName: lecture.user.customer[0].customerName,
        customerPhoneNumber: lecture.user.customer[0].customerPhoneNumber,
        customerAddress: lecture.user.customer[0].customerAddress,
      }));
      setSelectedCourse(membersDetail);
      setShowMemberList(true);
    }
  };

  return (
    <Portal>
      <div
        className={styled.container}
        style={{
          height: window.innerHeight - (266 + itemHeight + itemHeight),
          transform: `translateY(${movingCursorPositon}px)`,
        }}
      >
        <button
          className={styled.top_btn}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={throttle(handleTouchMove, 10)}
          onTouchEnd={handleTouchEnd}
        >
          <div />
        </button>
        <div className={styled.info}>
          <span>{date.getDate()},</span>
          <span
            className={`${styled.date} ${date.getDay() === 6 && styled.blue} ${date.getDay() === 0 && styled.red}`}
          >
            {WEEK_DAYS[date.getDay()]}
          </span>
        </div>
        <div className={styled.list}>
          {scheduleInfo.length !== 0 ? (
            scheduleInfo.map((schedule) => (
              <div
                key={randomId()}
                onClick={() => handleCourseClick(schedule.lecture)}
              >
                <CourseDetailItem
                  schedule={schedule}
                  selectedDate={selectedDate}
                />
              </div>
            ))
          ) : (
            <div>
              <p>등록된 수업이 없습니다.</p>
            </div>
          )}
        </div>
        {showMemberList && selectedCourse.length > 0 && (
          <div className={styled.memberList}>
            <ul>
              {selectedCourse.map((member) => (
                <li key={member.lectureId} className={styled.memberItem}>
                  {member.customerProfileImage ? (
                    <img
                      src={member.customerProfileImage}
                      alt={`${member.customerName} 프로필 이미지`}
                      className={styled.profileImage}
                    />
                  ) : (
                    <div className={styled.defaultProfileImage}>
                      기본 이미지
                    </div>
                  )}
                  <div className={styled.memberInfo}>
                    <p>{member.customerName}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Portal>
  );
}
