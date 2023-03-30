import Image from "next/image";
import Link from "next/link";
import React from "react";

import { useRecoilState } from "recoil";
import { contentState } from "../atom/contentAtom";

const Sidebar = () => {
  const [content, setContent] = useRecoilState(contentState);

  return (
    <div className="bg-[#26272A] w-[240px] h-screen p-8 text-[#8D8D8D] z-30">
      <Link href="/" classname="flex">
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
            className="object-contain self-center rotate-180"
          />
        </div>
      </Link>
      {/* Login */}
      <div className="space-y-8">
        <Link href="/NFT/Login" className="flex">
          <div
            className={content === "nft" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("nft")}
          >
            <Image
              src="/nft.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md self-center text-[#F7F7F7] mr-2">NFT</p>
          </div>
        </Link>
        {content === "nft" ? (
          <div className="space-y-2 pl-4">
            <Link href="/NFT/NFTMarketplace">
              <div className="flex justify-start space-x-2">
                <p className="self-center">Marketplace</p>
              </div>
            </Link>
            <Link href="/NFT/SellNFT">
              <div className="flex justify-start space-x-2">
                <p className="self-center">Sell NFT</p>
              </div>
            </Link>
            <Link href="/NFT/Profile">
              <div className="flex justify-start space-x-2">
                <p className="self-center">NFT Profile</p>
              </div>
            </Link>
          </div>
        ) : null}
        <Link href="/Functions" className="flex">
          <div
            className={content === "functions" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("functions")}
          >
            <Image
              src="/functions.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md self-center text-[#F7F7F7] mr-2">Functions</p>
          </div>
        </Link>
        <Link href="/Faucet" className="flex">
          <div
            className={content === "faucet" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("faucet")}
          >
            <Image
              src="/branding-logo.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md text-[#F7F7F7] self-center mr-2">Faucet</p>
          </div>
        </Link>
        <Link href="/Staking" className="flex">
          <div
            className={content === "staking" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("staking")}
          >
            <Image
              src="/branding-logo.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md text-[#F7F7F7] self-center mr-2">Staking</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
