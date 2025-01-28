import type { Metadata } from "next";
import { VoteProvider } from "@/contexts/VoteContainer";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monkey Magic",
  description: "Monkey Magic",
};

const pretendard = localFont({
  src: "../PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard`}>
        <VoteProvider>{children}</VoteProvider>
      </body>
    </html>
  );
}
