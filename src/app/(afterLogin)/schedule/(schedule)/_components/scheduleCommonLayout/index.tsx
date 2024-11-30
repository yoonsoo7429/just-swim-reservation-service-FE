import {
  getTodayScheduleCountForCustomer,
  getTodayScheduleCountForInstructor,
} from "@utils";

import { ScheduleCommon } from "../scheduleCommon";
import { getMyProfile } from "@apis";
import { USER_TYPE } from "@data";

export async function ScheduleCommonLayout() {
  const user = await getMyProfile();
  const todayCount =
    user.data.data.userType === USER_TYPE.INSTRUCTOR
      ? await getTodayScheduleCountForInstructor()
      : await getTodayScheduleCountForCustomer();

  return (
    <>
      <ScheduleCommon count={todayCount} />
    </>
  );
}
