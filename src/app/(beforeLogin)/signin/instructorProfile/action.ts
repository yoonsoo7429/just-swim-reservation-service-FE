import { createInstructor } from "@apis";
import { InstructorBasicProps } from "@types";

export async function formAction(data: InstructorBasicProps) {
  // 서버에 presigned url 요청 api
  if (data.instructorProfileImage?.length === 0) {
    data.instructorProfileImage = undefined;
  }
  const result = await createInstructor(data);

  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: result.message || "서버 오류 발생" };
  }
}
