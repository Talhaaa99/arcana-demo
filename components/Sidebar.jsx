import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useRecoilState } from "recoil";
import { contentState } from "../atom/contentAtom";

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
        <Link href="/Homepage" className="flex">
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
        </Link>
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
        <Link href="/Nftmarket" className="flex">
          <div className="flex">
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
        </Link>
        <div className="flex flex-col ml-6 gap-2">
          <Link href="/Nftmarket">
            <h1 className="mr-4 text-[#8D8D8D]">Home</h1>
          </Link>
          <Link href="/createnft">
            <h1 className="mr-6 text-[#8D8D8D]">Sell NFT</h1>
          </Link>
          <Link href="/mynfts">
            <h1 className="mr-6 text-[#8D8D8D]">My NFTs</h1>
          </Link>
          <Link href="/dashboard">
            <h1 className="mr-6 text-[#8D8D8D]">Dashboard</h1>
          </Link>
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
