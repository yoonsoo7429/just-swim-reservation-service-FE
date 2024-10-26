import { EditLectureProps } from "@types";
import { Fetch } from "@utils";

export async function editLecture(
  data: EditLectureProps,
  lectureId: string
): Promise<{ success: boolean; message: string }> {
  const result = await Fetch<{
    success: boolean;
    message: string;
  }>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/lecture/${lectureId}`,
    method: "PATCH",
    header: {
      token: true,
      json: true,
      credential: true,
    },
    body: data,
  });

  return result;
}
