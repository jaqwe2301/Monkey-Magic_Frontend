"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import clsx from "clsx";
import { verifyApi } from "../api/api"; // 예매번호 검증 API 호출

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const socket = io("http://localhost:8000");

interface Votes {
  [key: string]: number;
}

const teams = ["최수웅", "웬즈데이", "이세현밴드", "오프더로드", "전체이용가"];

export default function VotingPage() {
  const [votes, setVotes] = useState<Votes>({});
  const [votedTeam, setVotedTeam] = useState<string | null>(null);
  const [isShowModal, setIsShowModal] = useState(true); // 모달 상태
  const [bookingNumber, setBookingNumber] = useState(""); // 입력된 예매번호
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // socket.on("update", (data: Votes) => {
    //   setVotes(data);
    // });
    // return () => {
    //   socket.off("update");
    // };
  }, []);

  const handleVerify = async () => {
    try {
      const token = await verifyApi(bookingNumber); // 예매번호 검증 API 호출
      setToken(token); // 토큰 저장

      setIsShowModal(false); // 모달 닫기
      setErrorMessage(null); // 오류 메시지 초기화
    } catch (err) {
      setErrorMessage("예매번호 검증 중 오류가 발생했습니다.");
      throw err;
    }
  };

  const handleVote = (option: string) => {
    setVotedTeam(option);
    socket.emit("vote", { option });

    setTimeout(() => {
      setVotedTeam(null);
    }, 1000);
  };

  const data = {
    labels: teams,
    datasets: [
      {
        label: "투표 수",
        data: teams.map((team) => votes[team] || 0),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-gray-900 flex flex-col items-center py-8 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen font-sans">
      {isShowModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">예매번호 확인</h2>
            <input
              type="text"
              placeholder="예매번호를 입력하세요"
              value={bookingNumber}
              onChange={(e) => setBookingNumber(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full mb-4"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
              onClick={handleVerify}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              확인하기
            </button>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8 text-gray-700">실시간 투표</h1>
      <div className="w-full max-w-4xl mb-8">
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: { legend: { display: false } },
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {teams.map((team) => (
          <div
            key={team}
            className={clsx(
              "bg-white p-6 rounded-lg shadow-md text-center transform transition-all duration-300",
              {
                "scale-105 shadow-lg": votedTeam === team,
                "hover:scale-105 hover:shadow-lg": votedTeam !== team,
              }
            )}
          >
            <h2 className="text-xl font-semibold text-gray-600 mb-4">{team}</h2>
            <p className="text-lg font-bold text-blue-600 mb-4">
              {votes[team] || 0} 표
            </p>
            <button
              onClick={() => handleVote(team)}
              className={clsx(
                "px-4 py-2 rounded-md text-white transition-all duration-300",
                {
                  "bg-blue-600": votedTeam !== team,
                  "bg-green-500": votedTeam === team,
                  "hover:bg-blue-700": !votedTeam,
                }
              )}
            >
              {votedTeam === team ? "투표 완료!" : "투표하기"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
