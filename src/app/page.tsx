"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

// 투표 데이터 타입 정의
interface Vote {
  option: string;
}

export default function VotingPage() {
  const [votes, setVotes] = useState<Vote[]>([]); // 타입 명시

  useEffect(() => {
    socket.on("update", (data: Vote) => {
      setVotes((prev) => [...prev, data]);
    });

    return () => {
      socket.off("update");
    };
  }, []);

  const handleVote = (option: string) => {
    socket.emit("vote", { option });
  };

  return (
    <div>
      <h1>실시간 투표</h1>
      <button onClick={() => handleVote("Option A")}>Option A</button>
      <button onClick={() => handleVote("Option B")}>Option B</button>
      <div>
        <h2>투표 현황:</h2>
        {votes.map((vote, index) => (
          <div key={index}>{vote.option}</div>
        ))}
      </div>
    </div>
  );
}
