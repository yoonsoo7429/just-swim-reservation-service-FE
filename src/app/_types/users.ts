import { SNS, USER_TYPE } from "@data";

export type Provider = (typeof SNS)[keyof typeof SNS];
export type UserType = (typeof USER_TYPE)[keyof typeof USER_TYPE];

export interface UserEntity {
  userId: string;
  userType: UserType;
  provider: Provider;
  email: string;
  userCreatedAt: string;
  userUpdatedAt: string;
  customer: {
    customerId: string;
    customerName: string;
    customerProfileImage: string | null;
    customerBirth: string;
    customerPhoneNumber: string;
    customerGender: string;
    customerAddress: string;
    customerCreatedAt: string;
    customerUpdatedAt: string;
  }[];
  instructor: {
    instructorId: string;
    instructorName: string;
    instructorProfileImage: string | null;
    customerCreatedAt: string;
    customerUpdatedAt: string;
  }[];
}

export interface PostUserLoginReq
  extends Pick<UserEntity, "email" | "provider"> {}

export interface PostUserTypeReq extends Pick<UserEntity, "userType"> {}

export interface GetUserProfileRes {
  status: number;
  data: {
    success: boolean;
    message: string;
    data: UserEntity;
  };
}

export interface PostUserTypeReq {
  userType: UserType;
}
