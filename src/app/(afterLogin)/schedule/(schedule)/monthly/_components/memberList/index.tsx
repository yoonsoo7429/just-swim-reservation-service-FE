"use client";

import Image from "next/image";
import { SelectedCourseProps } from "@types";
import { NoProfileImage } from "@assets";
import styled from "./styles.module.scss";
import DatePicker from "react-datepicker";
import { useState } from "react";

export function MemberList({
  members,
  userType,
}: {
  members: SelectedCourseProps[];
  userType: string | null;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
                />
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
