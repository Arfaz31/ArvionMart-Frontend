/* eslint-disable @typescript-eslint/no-explicit-any */
// src/Services/ProductServices/getAllProducts.ts

"use server";

type TApiResponse = {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: any[];
};

export const getAllProducts = async (searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<TApiResponse> => {
  // একটি নতুন URLSearchParams অবজেক্ট তৈরি করুন
  const query = new URLSearchParams();

  // ধাপ ১: ডিফল্ট মানগুলো প্রথমে সেট করুন
  query.set("page", "1");
  query.set("limit", "10"); // আপনার প্রয়োজনীয় ডিফল্ট limit

  // ধাপ ২: searchParams থেকে পাওয়া মান দিয়ে ডিফল্ট মান ওভাররাইট করুন
  // যদি searchParams-এ page বা limit থাকে, তবে এখানকার মান ব্যবহৃত হবে
  for (const key in searchParams) {
    const value = searchParams[key];
    if (value) {
      // .set() ব্যবহার করলে একই কী (key) একাধিকবার যুক্ত হবে না, এটি ওভাররাইট করবে
      query.set(key, Array.isArray(value) ? value.join(",") : value);
    }
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/product?${query.toString()}`;
  console.log("Calling API:", apiUrl); // ডিবাগিং এর জন্য

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Product fetch error:", error);
    throw error;
  }
};
