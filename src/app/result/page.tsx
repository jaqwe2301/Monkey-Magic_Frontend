"use client";

import { getVoteResultsApi } from "@/api/voteApi";
import { useEffect, useState } from "react";

interface VoteData {
  [key: string]: number;
}

export default function VoteResultPage() {
  const [votes, setVotes] = useState<VoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVotes = async () => {
      try {
        const data = await getVoteResultsApi();
        setVotes(data);
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };

    getVotes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-primary p-6">
      <h1 className="text-3xl font-bold mb-6">투표 결과</h1>

      {loading ? (
        <p className="text-lg">결과 불러오는 중...</p>
      ) : (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <ul>
            {votes &&
              Object.entries(votes).map(([team, count]) => (
                <li
                  key={team}
                  className="flex justify-between items-center p-3 border-b last:border-b-0"
                >
                  <span className="font-semibold text-lg mr-10">{team}</span>
                  <span className="text-xl font-bold text-primary">
                    {count} 표
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
