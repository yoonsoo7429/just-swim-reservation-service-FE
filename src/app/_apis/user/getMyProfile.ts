"use server";

import { unstable_cache } from "next/cache";

import { UserEntity } from "@types";
import { APICommon } from "@utils";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/user`;

async function getMyProfile(): Promise<UserEntity | null> {
  const result = await APICommon<UserEntity>({
    url: `${URL}/myProfile`,
  });
  return result;
}

export const getCachedMyProfile = unstable_cache(getMyProfile, ["my-profile"], {
  tags: ["my-profile"],
});
