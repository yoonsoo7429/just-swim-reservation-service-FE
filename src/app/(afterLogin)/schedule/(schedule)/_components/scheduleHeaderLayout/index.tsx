import { getCachedMyProfile } from "@apis";

import { ScheduleHeader } from "../scheduleHeader";
import { USER_TYPE } from "@data";

export async function ScheduleHeaderLayout() {
  const profileInfo = await getCachedMyProfile();

  const profileImage =
    profileInfo?.userType === USER_TYPE.CUSTOMER
      ? (profileInfo.customer[0]?.customerProfileImage ?? undefined)
      : profileInfo?.userType === USER_TYPE.INSTRUCTOR
        ? (profileInfo.instructor[0]?.instructorProfileImage ?? undefined)
        : undefined;

  if (profileImage === null) {
    return profileImage;
  }

  return (
    <>
      <ScheduleHeader image={profileImage} />
    </>
  );
}
