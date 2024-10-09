import { z } from "zod";

export const instructorProfileSchema = z.object({
  instructorProfileImage: z.any().optional(),
  instructorName: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .max(30, "최대 30글자만 입력할 수 있습니다."),
  instructorPhoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요.")
    .max(11, "전화번호가 아닙니다.")
    .regex(/^\d{1,11}$/, "전화번호는 숫자만 포함해야 합니다."),
});

export type InstructorProfileType = z.infer<typeof instructorProfileSchema>;
