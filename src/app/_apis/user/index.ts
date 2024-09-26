"use server";

import { HTTP_METHODS, HTTP_STATUS } from "@data";
import api from "../api";
import { GetUserProfileRes, PostUserLoginReq } from "@types";

const USER_API_PATH = "/user";
const OAUTH_API_PATH = "Oauth";

export const getSignIn = async (param: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${OAUTH_API_PATH}/${param}`,
    {
      method: HTTP_METHODS.GET,
    }
  );

  if (response.status === HTTP_STATUS.OK) {
    return response.url as string;
  }
};

// 타입 수정 필요
export const postUserLogin = async (data: PostUserLoginReq) => {
  return await api("/login", HTTP_METHODS.POST, {
    body: JSON.stringify(data),
  });
};

export const postUserType = async (data: string) => {
  return await api(`${USER_API_PATH}/${data}`, HTTP_METHODS.POST);
};

export const getMyProfile = async (): Promise<GetUserProfileRes> => {
  return await api(`${USER_API_PATH}/myProfile`, HTTP_METHODS.GET);
};

export const postUserLogout = async () => {
  return await api(`${USER_API_PATH}/logout`, HTTP_METHODS.POST);
};
