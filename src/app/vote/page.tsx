"use client";

import { useState } from "react";
import { useVote } from "@/contexts/VoteContainer";
import { AxiosError } from "axios"; // AxiosError 타입 추가
import Image from "next/image";
import coverScratch from "public/images/cover-scratch.png";
import { useRouter } from "next/navigation";

import { requestOtpApi, verifyOtpApi, voteApi } from "@/api/voteApi";

import Green from "public/images/jewel/animated_gem_green.gif";
import Blue from "public/images/jewel/animated_gem_blue_reverse.gif";
import Red from "public/images/jewel/animated_gem_red_fast.gif";
import Yellow from "public/images/jewel/animated_gem_yellow.gif";
import Purple from "public/images/jewel/animated_gem_purple.gif";

const teams = [
  { name: "최수웅", color: Blue },
  { name: "웬즈데이", color: Purple },
  { name: "이세현밴드", color: Green },
  { name: "오프더로드", color: Red },
  { name: "전체이용가", color: Yellow },
];

export default function VotePage() {
  const router = useRouter();

  const { phoneNumber, setPhoneNumber } = useVote();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  // 🔹 휴대폰 번호 입력 후 인증번호 요청
  const handleRequestOtp = async () => {
    try {
      if (!inputPhoneNumber) {
        setError("휴대폰 번호를 입력하십시오.");
        return;
      }
      if (inputPhoneNumber.length !== 11) {
        setError("휴대폰 인증은 11자리 번호만 가능합니다.");
        return;
      }
      setError("");
      const response = await requestOtpApi(inputPhoneNumber);
      setIsOtpSent(true);
      alert(response.message);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "인증번호 요청 실패");
      } else {
        setError("알 수 없는 오류 발생");
      }
    }
  };

  // 🔹 인증번호 확인
  const handleVerifyOtp = async () => {
    try {
      setError("");
      await verifyOtpApi(inputPhoneNumber, otp);
      setPhoneNumber(inputPhoneNumber);
      setShowModal(false);
      setIsVerified(true);
      // alert(response.message);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "인증번호 확인 실패");
      } else {
        setError("알 수 없는 오류 발생");
      }
    }
  };

  // 🔹 투표하기
  const handleVoteSubmit = async () => {
    if (!isVerified) {
      setError("휴대폰 인증을 먼저 완료해야 합니다.");
      return;
    }

    if (selectedTeams.length !== 2) {
      setError("두 팀을 선택해야 합니다.");
      return;
    }

    try {
      await voteApi(phoneNumber, selectedTeams[0], selectedTeams[1]);
      alert("투표가 완료되었습니다.");
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data?.message || "투표 중 오류 발생");
      } else {
        setError("알 수 없는 오류 발생");
      }
    }
  };

  // 🔹 팀 선택 토글
  const toggleTeamSelection = (team: string) => {
    setSelectedTeams((prev) =>
      prev.includes(team)
        ? prev.filter((t) => t !== team)
        : prev.length === 2
        ? [prev[1], team]
        : [...prev, team]
    );
  };

  return (
    <div className="font-ssshinb7 max-w-[600px] w-full bg-gradient-to-b text-white flex flex-col items-center justify-center p-6 h-screen">
      <div className="absolute w-full top-0 left-0 z-10 opacity-10 max-h-screen overflow-y-hidden pointer-events-none">
        <Image
          className="w-full"
          alt="scratch"
          src={coverScratch.src}
          width={1210}
          height={1698}
        />
        <Image
          className="w-full"
          alt="scratch"
          src={coverScratch.src}
          width={1210}
          height={1698}
        />
      </div>
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20 text-black">
          <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
            <h1 className="font-bold mb-4 w-full text-center">
              휴대폰 인증 후, 투표가 가능합니다.
            </h1>
            {/* <h2 className="text-lg font-bold mb-4">휴대폰 번호 입력</h2> */}
            <input
              type="text"
              placeholder="휴대폰 번호 입력"
              className="border w-full p-2 mb-4 font-pretendard"
              onChange={(e) => {
                setError("");
                setInputPhoneNumber(e.target.value);
              }}
            />
            {!isOtpSent ? (
              <button
                onClick={handleRequestOtp}
                className="bg-primary text-black px-4 py-2 rounded w-full"
              >
                인증번호 요청
              </button>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="인증번호 입력"
                  className="border w-full p-2 my-4 font-pretendard"
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-primary text-black px-4 py-2 rounded w-full"
                >
                  인증번호 확인
                </button>
              </>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}

      <div
        className={`w-full flex flex-col items-center transition-opacity duration-700 ease-in-out ${
          showModal ? "opacity-0" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">💎 공연 투표 💎</h1>
        <p className="text-sm mb-6 text-gray-300 text-center">
          원하는 두 팀을 선택하고 투표하세요!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md justify-center">
          {teams.map((team) => (
            <div
              key={team.name}
              className={`relative p-4 text-center border-2 rounded-lg cursor-pointer transition-all duration-300
            ${
              selectedTeams.includes(team.name)
                ? "border-yellow-400 bg-opacity-70 scale-105 shadow-lg shadow-yellow-500/50"
                : "border-gray-400 bg-opacity-30"
            }`}
              onClick={() => toggleTeamSelection(team.name)}
            >
              <Image
                src={team.color.src}
                alt={team.name}
                className="w-16 h-16 mx-auto mb-2 animate-pulse"
                width={1950}
                height={1950}
              />
              <span className="block font-semibold text-lg">{team.name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleVoteSubmit}
          className="mt-8 px-6 py-3 text-lg font-semibold rounded-md bg-[#008746] text-white shadow-md transition-all duration-300"
        >
          투표하기
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}
