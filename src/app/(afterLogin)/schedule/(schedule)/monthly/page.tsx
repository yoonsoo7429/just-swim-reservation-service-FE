import { getMyProfile } from "@apis";
import { MonthlyWrapper } from "./_components";
import { redirect } from "next/navigation";
import { USER_TYPE } from "@data";

export default async function Monthly() {
  const user = await getMyProfile();

  if (user.data.data.userType === USER_TYPE.CUSTOMER) {
    redirect("/schedule/monthly/customer");
  }
  if (user.data.data.userType === USER_TYPE.INSTRUCTOR) {
    redirect("/schedule/monthly/instructor");
  }
}
