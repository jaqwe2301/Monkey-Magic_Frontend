import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function verifyApi(bookingNumber: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/bookings/verify`, {
      bookingNumber,
    });
    const { token } = response.data;
    console.log(token);
    return token as string;
  } catch (err) {
    console.error("예매번호 검증 중 오류 발생:", err); // 에러 로깅
    throw err; // 에러를 다시 던져 클라이언트에서 처리하도록
  }
}
