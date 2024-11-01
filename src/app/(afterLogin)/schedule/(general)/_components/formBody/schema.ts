import { z } from "zod";

const titleRegexp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9| |(|)|\-|\_|\[|\]]+$/g;

export const courseSchema = z
  .object({
    courseTitle: z
      .string()
      .min(1, "수업명을 입력해주세요.")
      .max(15, "최대 15글자만 입력할 수 있습니다.")
      .regex(
        titleRegexp,
        "( ) [ ] - _를 제외한 특수문자는 입력할 수 없습니다."
      ),
    courseDays: z.string().min(1, "수업 요일을 선택해주세요."),
    courseStartTime: z.string(),
    courseEndTime: z.string(),
    courseCapacity: z.number().min(1, "최소 수강 인원은 1명입니다."),
  })
  .superRefine(({ courseStartTime, courseEndTime }, ctx) => {
    const [startHour, startMinute] = courseStartTime.split(":").map(Number);
    const [endHour, endMinute] = courseEndTime.split(":").map(Number);

    if (
      startHour > endHour ||
      (startHour === endHour && startMinute >= endMinute)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "종료 시간을 시작 시간 이후로 입력해주세요.",
        path: ["courseEndTime"],
      });
    }
  });

export type courseType = z.infer<typeof courseSchema>;
