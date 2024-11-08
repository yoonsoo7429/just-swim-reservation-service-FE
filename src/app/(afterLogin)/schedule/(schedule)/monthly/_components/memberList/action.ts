import { editLecture } from "@apis";
import { EditLectureProps } from "@types";

export async function formAction(data: EditLectureProps, lectureId: string) {
  const result = await editLecture(data, lectureId);
  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: result.message || "서버 오류 발생" };
  }
}
