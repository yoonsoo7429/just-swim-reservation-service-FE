import { getMyProfile } from "@apis";

import { ScheduleHeader } from "../scheduleHeader";
import { USER_TYPE } from "@data";

export async function ScheduleHeaderLayout() {
  const profileInfo = await getMyProfile();

  const profileImage =
    profileInfo?.data.data.userType === USER_TYPE.CUSTOMER
      ? (profileInfo.data.data.customer[0]?.customerProfileImage ?? undefined)
      : profileInfo?.data.data.userType === USER_TYPE.INSTRUCTOR
        ? (profileInfo.data.data.instructor[0]?.instructorProfileImage ??
          undefined)
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
