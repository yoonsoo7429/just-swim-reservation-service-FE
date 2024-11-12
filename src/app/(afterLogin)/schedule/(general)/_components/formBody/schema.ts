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
    courseTime: z.string().min(1, "수업 시간을 입력해주세요"),
    courseCapacity: z.string().min(1, "최소 수강 인원은 1명입니다."),
    courseColor: z.string(),
  })
  .superRefine(({ courseTime }, ctx) => {
    if (courseTime) {
      const [start, end] = courseTime.split("-");

      // 시작 시간과 종료 시간 분리
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);

      // 종료 시간이 시작 시간 이후인지 검증
      if (
        startHour > endHour ||
        (startHour === endHour && startMinute >= endMinute)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "종료 시간을 시작 시간 이후로 입력해주세요.",
          path: ["courseTime"],
        });
      }
    }
  });

export type courseType = z.infer<typeof courseSchema>;
