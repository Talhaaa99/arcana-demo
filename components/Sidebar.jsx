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
            className="object-contain self-center"
          />
        </div>
      </Link>
      {/* Login */}
      <div className="space-y-8">
        <Link href="/Login" classname="flex">
          <div
            className={content === "login" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("login")}
          >
            <Image
              src="/profile.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md text-[#F7F7F7] self-center mr-2">Login</p>
            <Image
              src="/Chevron_Up.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center border-[#8d8d8d]"
            />
          </div>
        </Link>
        {content === "login" ? (
          <div className="space-y-2 pl-4">
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Plug and Play</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Passwordless</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Google</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Twitter</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Github</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Discord</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Rainbow Kit</p>
            </div>
          </div>
        ) : null}
        <Link href="/Branding" className="flex">
          <div
            className={content === "branding" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("branding")}
          >
            <Image
              src="/Branding.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md text-[#F7F7F7] self-center mr-2">Branding</p>
            <Image
              src="/Chevron_Up.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center text-[#8D8D8D]"
            />
          </div>
        </Link>
        {content === "branding" ? (
          <div className="space-y-2 pl-4">
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Add Image</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Change Color</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Change Font</p>
            </div>
          </div>
        ) : null}
        <Link href="/Chains" className="flex">
          <div
            className={content === "chains" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("chains")}
          >
            <Image
              src="/Chain.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md self-center text-[#F7F7F7] mr-2">Chains</p>
            <Image
              src="/Chevron_Up.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center text-[#8D8D8D]"
            />
          </div>
        </Link>
        {content === "chains" ? (
          <div className="space-y-2 pl-4">
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Select Chain</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Custom Chain</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Switch Chain</p>
            </div>
          </div>
        ) : null}
        <Link href="/Tokens" className="flex">
          <div
            className={content === "tokens" ? "flex active-sidebar" : "flex"}
            onClick={() => setContent("tokens")}
          >
            <Image
              src="/tokens.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center mr-4"
            />
            <p className="text-md self-center text-[#F7F7F7] mr-2">Tokens</p>
            <Image
              src="/Chevron_Up.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center text-[#8D8D8D]"
            />
          </div>
        </Link>
        {content === "tokens" ? (
          <div className="space-y-2 pl-4">
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Add Token</p>
            </div>
            <div className="flex justify-start space-x-2">
              <input type="checkbox" className="self-center" />
              <p className="self-center">Send Token</p>
            </div>
          </div>
        ) : null}
        <Link href="/NFT/NFTMarketplace" className="flex">
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
            <Image
              src="/Chevron_Up.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center text-[#8D8D8D]"
            />
          </div>
        </Link>
        {content === "nft" ? (
          <div className="space-y-2 pl-4">
            <Link href="/NFT/NFTMarketplace">
              <div className="flex justify-start space-x-2">
                <input type="checkbox" className="self-center" />
                <p className="self-center">Marketplace</p>
              </div>
            </Link>
            <Link href="/NFT/SellNFT">
              <div className="flex justify-start space-x-2">
                <input type="checkbox" className="self-center" />
                <p className="self-center">Sell NFT</p>
              </div>
            </Link>
            <Link href="/NFT/Profile">
              <div className="flex justify-start space-x-2">
                <input type="checkbox" className="self-center" />
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
            <Image
              src="/Chevron_Up.png"
              alt="/"
              height={24}
              width={24}
              className="object-contain self-center text-[#8D8D8D]"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
