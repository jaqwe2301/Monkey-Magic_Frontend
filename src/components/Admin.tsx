import React, { useState } from "react";
import Instance from "@/lib/auth";

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [votes, setVotes] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    if (
      credentials.username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      credentials.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setAuth(true);
      fetchVotes();
    } else {
      alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  const fetchVotes = async () => {
    try {
      const response = await Instance.get("/votes");
      setVotes(response.data.votes);
    } catch (err) {
      alert("결과를 가져오는 중 오류가 발생했습니다.");
      throw err;
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-primary flex flex-col items-center justify-center p-4">
      {!auth ? (
        <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
          <h2 className="text-lg font-bold mb-4">관리자 로그인</h2>
          <input
            type="text"
            placeholder="아이디"
            className="border w-full p-2 mb-4"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border w-full p-2 mb-4"
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <button
            onClick={handleLogin}
            className="bg-primary text-black px-4 py-2 rounded"
          >
            로그인
          </button>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
          <h2 className="text-lg font-bold mb-4">투표 결과</h2>
          <ul>
            {Object.entries(votes).map(([team, count]) => (
              <li key={team} className="mb-2">
                {team}: {count}표
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
