"use client";

// import VotingPage from "../components/Vote";
import { motion } from "framer-motion";
import Image from "next/image";

import bgGreen from "public/images/bg-green.png";
import coverBlack from "public/images/cover-black.png";
import monkeyFace from "public/images/monkey-face.png";
import title from "public/images/title.png";
import coverScratch from "public/images/cover-scratch.png";

export default function Main() {
  // return <VotingPage />;
  return (
    <div className="w-screen relative flex flex-col items-center max-w-[700px]">
      {/* 다른 이미지들 */}
      <motion.div
        className="absolute top-[12vw] z-10 w-[45vw]"
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
      <motion.div
        className="absolute top-[60vw] z-20 w-[95vw]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      >
        <Image
          src={title.src}
          alt="title"
          width={1123}
          height={575}
          className="w-full"
        />
        <p className="mt-[6vw] text-[9vw] font-bold text-white w-full text-center">
          25.02.04.7PM
        </p>
        <div className="flex w-full justify-center gap-3 text-[3vw] font-bold text-white">
          <p>이세현밴드</p>
          <p>최수웅</p>
          <p>Wednesday</p>
          <p>오프더로드</p>
          <p>전체이용가밴드</p>
        </div>
      </motion.div>
      <Image
        src={coverBlack.src}
        className="absolute top-0 left-0 z-10"
        alt="cover-black"
        width={1207}
        height={1701}
      />
      <Image
        src={coverScratch.src}
        alt="cover-scratch"
        width={1208}
        height={1698}
        className="absolute w-full left-0 top-0 z-20 opacity-10"
      />
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
        <Image
          src={bgGreen.src}
          alt="bg-green"
          width={1209}
          height={1702}
          className=""
        />
      </motion.div>
    </div>
  );
}
