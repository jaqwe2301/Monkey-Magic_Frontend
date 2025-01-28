import axios from "axios";

console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

const Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default Instance;
