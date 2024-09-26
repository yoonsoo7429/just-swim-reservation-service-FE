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
