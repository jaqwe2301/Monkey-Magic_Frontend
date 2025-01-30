"use client";

// import VotingPage from "../components/Vote";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import bgGreen from "public/images/bg-green.png";
import coverBlack from "public/images/cover-black.png";
import monkeyFace from "public/images/monkey-face.png";
import title from "public/images/title.png";
import coverScratch from "public/images/cover-scratch.png";

import Ticket from "public/asssets/ticket.svg";
import Insta from "public/asssets/instagram.svg";

<Head>
  <link rel="preload" as="image" href={coverScratch.src} />
</Head>;

export default function Main() {
  const [showNextDiv, setShowNextDiv] = useState(false);

  // return <VotingPage />;
  return (
    <div className="w-screen relative flex flex-col items-center max-w-[600px]">
      {/* 다른 이미지들 */}
      <motion.div
        className="absolute top-limited-monkey-face z-10 w-[45vw] max-w-[270px]"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={monkeyFace.src}
          alt="monkey-face"
          width={611}
          height={514}
          className="w-full"
        />
      </motion.div>

      {/* title 애니메이션 */}
      <div className="absolute top-limited-title z-20 w-full flex flex-col items-center">
        <motion.div
          className="w-[95vw] max-w-[570px]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
          onAnimationComplete={() => setShowNextDiv(true)}
        >
          <Image
            src={title.src}
            alt="title"
            width={1123}
            height={575}
            className="w-full"
          />
          <p className="margin-top-limited-date font-size-limited-date font-bold text-white w-full text-center">
            25.02.04.7PM
          </p>
          <div className="flex w-full justify-center gap-3 font-size-limited-teams font-bold text-white">
            <p>이세현밴드</p>
            <p>최수웅</p>
            <p>Wednesday</p>
            <p>오프더로드</p>
            <p>전체이용가밴드</p>
          </div>
        </motion.div>
        {showNextDiv && (
          <motion.div
            className="w-full flex items-center justify-center gap-5 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Link
              className="text-white flex items-center justify-center gap-[10px] w-[130px] h-[50px] rounded-xl bg-[#363636]"
              href="https://www.tinyticket.net/event-manager/EM7TcbpyPZWt"
            >
              <Ticket />
              티켓 구매
            </Link>
            <Link
              className="text-white flex items-center justify-center gap-[10px] w-[130px] h-[50px] rounded-xl bg-[#363636]"
              href="https://www.instagram.com/monkeymagic.official"
            >
              <Insta />
              인스타그램
            </Link>
          </motion.div>
        )}
      </div>

      <Image
        src={coverBlack.src}
        className="absolute top-0 left-0 z-10"
        alt="cover-black"
        width={1207}
        height={1701}
      />
      <div
        className="absolute left-0 top-0 z-20 opacity-10 min-h-screen bg-cover bg-repeat-y w-screen pointer-events-none"
        style={{ backgroundImage: `url(${coverScratch.src})` }}
      >
        {/* <Image
          src={coverScratch.src}
          alt="cover-scratch"
          width={1208}
          height={1698}
          // className="absolute left-0 top-0 z-20 opacity-10"
        /> */}
        {/* <Image
          src={coverScratch.src}
          alt="cover-scratch"
          width={1208}
          height={1698}
          className="rotate-180"
          // className="absolute left-0 top-0 z-20 opacity-10"
        /> */}
      </div>
      {/* bgGreen 애니메이션 */}
      <motion.div
        className="absolute w-full z-0"
        initial={{
          clipPath: "inset(0 50% 0 50%)",
          opacity: 0,
        }}
        animate={{
          clipPath: "inset(0 0 0 0)",
          opacity: 1,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <Image src={bgGreen.src} alt="bg-green" width={1209} height={1702} />
      </motion.div>
    </div>
  );
}
