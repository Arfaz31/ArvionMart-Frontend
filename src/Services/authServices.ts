/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { axiosInstance } from "@/helper/axios/axiosInstance";

export const setTokenInCookies = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token);
};

export const getAccessTokenFromCookies = async () => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};

//get new access token from refresh token
export const getNewAccessToken = async () => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "http://localhost:5000/api/v1/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to get new access token");
  }
};
