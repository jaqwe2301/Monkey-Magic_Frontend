"use client";

import { useState } from "react";
import { useVote } from "@/contexts/VoteContainer";
import Instance from "@/lib/auth";

const teams = ["최수웅", "웬즈데이", "이세현밴드", "오프더로드", "전체이용가"];

export default function Home() {
  const { phoneNumber, setPhoneNumber } = useVote();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(true);
  const [inputPhoneNumber, setInputPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const handlePhoneNumberSubmit = async (phone: string) => {
    try {
      const response = await Instance.get(`/vote/check?phoneNumber=${phone}`);
      if (response.data.hasVoted) {
        setError("이미 투표한 번호입니다.");
        return;
      }
      setPhoneNumber(phone);
      setShowModal(false);
    } catch (error) {
      setError("서버 오류가 발생했습니다.");
      throw error;
    }
  };

  const handleVoteSubmit = async () => {
    if (selectedTeams.length !== 2) {
      setError("두 팀을 선택해야 합니다.");
      return;
    }

    try {
      await Instance.post("/vote", {
        phoneNumber,
        team1: selectedTeams[0],
        team2: selectedTeams[1],
      });
      alert("투표가 완료되었습니다.");
    } catch (error) {
      setError("투표 중 오류가 발생했습니다.");
      throw error;
    }
  };

  const toggleTeamSelection = (team: string) => {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  return (
    <div className="min-h-screen bg-secondary text-primary flex flex-col items-center justify-center p-4">
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
            <h2 className="text-lg font-bold mb-4">휴대폰 번호 입력</h2>
            <input
              type="text"
              placeholder="휴대폰 번호 입력"
              className="border w-full p-2 mb-4"
              onChange={(e) => {
                setError("");
                setInputPhoneNumber(e.target.value);
              }}
            />
            <button
              onClick={() => handlePhoneNumberSubmit(inputPhoneNumber)}
              className="bg-primary text-black px-4 py-2 rounded"
            >
              제출
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">투표하기</h1>
      <p className="text-sm mb-4 text-white">아래 팀 중 두 팀을 선택하세요.</p>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div
            key={team}
            className={`p-4 text-center border ${
              selectedTeams.includes(team)
                ? "bg-primary text-black"
                : "bg-white"
            }`}
            onClick={() => toggleTeamSelection(team)}
          >
            {team}
          </div>
        ))}
      </div>
      <button
        onClick={handleVoteSubmit}
        className="mt-6 bg-primary text-black px-6 py-2 rounded"
      >
        투표하기
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
