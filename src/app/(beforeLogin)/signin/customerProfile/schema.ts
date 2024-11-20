import { z } from "zod";

export const customerProfileSchema = z.object({
  customerProfileImage: z.any().optional(),
  customerName: z
    .string()
    .min(1, "이름을 입력해주세요.")
    .max(30, "최대 30글자만 입력할 수 있습니다."),
  customerBirth: z
    .string()
    .min(1, "생년월일을 입력해주세요.")
    .regex(/^\d{4}.\d{2}.\d{2}$/, "생년월일은 YYYY.MM.DD 형식이어야 합니다."),
  customerPhoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요.")
    .max(11, "전화번호가 아닙니다.")
    .regex(/^\d{1,11}$/, "전화번호는 숫자만 포함해야 합니다."),
  customerGender: z
    .string()
    .min(1, "성별을 선택해주세요.")
    .regex(/^(남성|여성)$/, "성별은 '남성' 또는 '여성'만 가능합니다."),
  customerPickUpLocation: z.string().min(1, "승차 위치를 입력해주세요."),
  customerDropOffLocation: z.string().min(1, "하차 위치를 입력해주세요."),
});

export type CustomerProfileType = z.infer<typeof customerProfileSchema>;
