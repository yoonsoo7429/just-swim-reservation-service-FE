import Image from "next/image";
import { SelectedCourseProps } from "@types";
import { NoProfileImage } from "@assets";
import styled from "./styles.module.scss";

export function MemberList({ members }: { members: SelectedCourseProps[] }) {
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
          </div>
        ))}
      </ul>
    </div>
  );
}
