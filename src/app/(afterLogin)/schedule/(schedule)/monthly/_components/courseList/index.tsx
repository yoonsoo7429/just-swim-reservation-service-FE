"use client";

import { MouseEvent, TouchEvent, useRef, useState } from "react";
import { CourseForMemberInfoProps, CourseProps } from "@types";
import { CourseDetailItem, Portal, StatusModal } from "@components";
import { randomId, throttle } from "@utils";
import { WEEK_DAYS } from "@data";
import styled from "./styles.module.scss";
import { MemberList } from "../memberList";

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

  // 각각의 강의에 대한 상태 관리
  const [selectedCourse, setSelectedCourse] = useState<{
    [key: string]: CourseForMemberInfoProps[];
  }>({});
  const [showMemberList, setShowMemberList] = useState<{
    [key: string]: boolean;
  }>({});

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const todayInfo = monthlyInfo.find((info) => info.date === selectedDate);
  const scheduleInfo = todayInfo?.courses || [];

  const handleDragStart = (event: MouseEvent<HTMLButtonElement>) => {
    startDrag.current = true;
    startCursorPosition.current = event.pageY;
  };

  const handleDragMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (!startDrag.current) return;
    if (event.pageY - startCursorPosition.current <= 0) return;

    setMovingCursorPosition(event.pageY - startCursorPosition.current);
  };

  const handleDragEnd = () => {
    if (!startDrag.current) return;
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
    if (event.targetTouches[0].pageY - startCursorPosition.current <= 0) return;
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

  const handleCourseClick = (
    courseId: string,
    instructorUserId: string,
    lectures: CourseProps["lecture"]
  ) => {
    const members = lectures.filter(
      (lecture) => lecture.lectureDate === selectedDate.replace(/\./g, "-")
    );

    setShowMemberList((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));

    if (showMemberList[courseId]) {
      setSelectedCourse((prev) => ({
        ...prev,
        [courseId]: [],
      }));
    } else {
      const membersDetail: CourseForMemberInfoProps[] = members.map(
        (lecture) => ({
          courseId,
          instructorUserId,
          lectureId: lecture.lectureId,
          userId: lecture.user.userId,
          userType: lecture.user.userType,
          customerProfileImage:
            lecture.user.customer[0]?.customerProfileImage || "",
          customerName: lecture.user.customer[0]?.customerName || "",
          customerPhoneNumber:
            lecture.user.customer[0]?.customerPhoneNumber || "",
          customerAddress: lecture.user.customer[0]?.customerAddress || "",
        })
      );

      setSelectedCourse((prev) => ({
        ...prev,
        [courseId]: membersDetail,
      }));
    }
  };

  const handleDateChange = () => {
    setStatusMessage("변경이 완료되었습니다.");
    setShowStatusModal(true);
    setTimeout(() => {
      setShowStatusModal(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <Portal>
      <div
        className={styled.container}
        style={{
          height: window.innerHeight - (230 + itemHeight + itemHeight),
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
              <div key={randomId()}>
                <div
                  onClick={() =>
                    handleCourseClick(
                      schedule.courseId,
                      schedule.user.userId,
                      schedule.lecture
                    )
                  }
                >
                  <CourseDetailItem
                    schedule={schedule}
                    selectedDate={selectedDate}
                  />
                </div>
                {showMemberList[schedule.courseId] &&
                  selectedCourse[schedule.courseId]?.length > 0 && (
                    <MemberList
                      members={selectedCourse[schedule.courseId]}
                      userType={schedule.userType}
                      courses={monthlyInfo}
                      selectedDate={selectedDate}
                      onDateChange={handleDateChange}
                    />
                  )}
              </div>
            ))
          ) : (
            <div>
              <p>등록된 수업이 없습니다.</p>
            </div>
          )}
        </div>
        <StatusModal
          statusMessage={statusMessage}
          isVisible={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          duration={2000}
        />
      </div>
    </Portal>
  );
}
