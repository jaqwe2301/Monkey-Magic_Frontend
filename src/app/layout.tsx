import type { Metadata } from "next";
import { VoteProvider } from "@/contexts/VoteContainer";
import localFont from "next/font/local";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Monkey Magic",
  description: "Monkey Magic",
};

const pretendard = localFont({
  src: "../styles/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const ssshinb7 = localFont({
  src: "../styles/fonts/SSShinb7Regular.ttf",
  display: "swap",
  weight: "45 920",
  variable: "--font-ssshinb7",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} ${ssshinb7.variable} font-pretendard bg-[#080404] flex flex-col items-center`}
      >
        <VoteProvider>{children}</VoteProvider>
      </body>
    </html>
  );
}
