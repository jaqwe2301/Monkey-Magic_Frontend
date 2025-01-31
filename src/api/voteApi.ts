import { AxiosError } from "axios";
import Instance from "@/lib/auth";

// 🔹 인증번호 요청 API
export const requestOtpApi = async (phoneNumber: string) => {
  try {
    const response = await Instance.post("/request-otp", { phoneNumber });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 🔹 인증번호 확인 API
export const verifyOtpApi = async (phoneNumber: string, otp: string) => {
  try {
    const response = await Instance.post("/verify-otp", { phoneNumber, otp });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "인증번호 확인 실패");
    }
    throw new Error("알 수 없는 오류 발생");
  }
};

// 🔹 투표 API
export const voteApi = async (
  phoneNumber: string,
  team1: string,
  team2: string
) => {
  try {
    const response = await Instance.post("/vote", {
      phoneNumber,
      team1,
      team2,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "투표 실패");
    }
    throw new Error("알 수 없는 오류 발생");
  }
};

// 🔹 중복 투표 여부 확인 API
export const checkVoteStatusApi = async (phoneNumber: string) => {
  try {
    const response = await Instance.get(`/vote/check`, {
      params: { phoneNumber },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "중복 투표 확인 실패");
    }
    throw new Error("알 수 없는 오류 발생");
  }
};

// 🔹 투표 결과 조회 API
export const getVoteResultsApi = async () => {
  try {
    const response = await Instance.get("/votes");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "결과 조회 실패");
    }
    throw new Error("알 수 없는 오류 발생");
  }
};
