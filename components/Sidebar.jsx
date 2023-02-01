import Image from "next/image";
import React from "react";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { contentState } from "../atom/contentAtom";
import LoginMethods from "./LoginMethods";

const Sidebar = () => {
  const [content, setContent] = useRecoilState(contentState);

  return (
    <div className="bg-[#26272A] w-[240px] h-screen p-8 text-[#8D8D8D] z-30">
      <div className="flex flex-row space-x-4 mb-[60px]">
        <Image
          src="/arcana-logo-dark.png"
          alt="/"
          height={26}
          width={35}
          className="object-contain self-center"
        />
        <Image
          src="/arcana-text-dark.png"
          alt="/"
          height={34}
          width={117}
          className="object-contain self-center"
        />
      </div>
      {/* Login */}
      <div className="space-y-8 text-[#8d8d8d] fill-current">
        <div className="flex" onClick={() => setContent("login")}>
          <Image
            src="/profile.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center mr-4 fill-current"
          />
          <p className="text-md mr-2">Login</p>
          <Image
            src="/Chevron_Up.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center border-[#8d8d8d]"
          />
        </div>
        <div className="flex" onClick={() => setContent("homepage")}>
          <Image
            src="/House_01.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center mr-4"
          />
          <p className="text-md mr-2">Homepage</p>
          <Image
            src="/Chevron_Up.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center text-[#8D8D8D]"
          />
        </div>
        <div className="flex" onClick={() => setContent("use-cases")}>
          <Image
            src="/user.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center mr-4"
          />
          <p className="text-md mr-2">Use Cases</p>
          <Image
            src="/Chevron_Up.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center text-[#8D8D8D]"
          />
        </div>
        <div className="flex" onClick={() => setContent("NFT")}>
          <Image
            src="/dashboard.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center mr-4"
          />
          <p className="text-md mr-2">NFT</p>
          <Image
            src="/Chevron_Up.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center text-[#8D8D8D]"
          />
        </div>
        <div className="flex" onClick={() => setContent("transactions")}>
          <Image
            src="/Arrow_Left_Right.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center mr-4"
          />
          <p className="text-md mr-2">Transactions</p>
          <Image
            src="/Chevron_Up.png"
            alt="/"
            height={24}
            width={24}
            className="object-contain self-center text-[#8D8D8D]"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
