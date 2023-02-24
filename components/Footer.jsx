import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[80px] bottom-0 absolute flex z-20 flex-row-reverse align-middle text-[#F7F7F7] tracking-wider">
      <div className="flex flex-row space-x-2 justify-items-end pr-[52px]">
        <h1 className="self-center text-lg">Powered by</h1>
        <Image
          src="/arcana-logo-dark.png"
          alt="/"
          height={15}
          width={20}
          className="object-contain self-center"
        />
        <Image
          src="/arcana-text-dark.png"
          alt="/"
          height={20}
          width={70}
          className="object-contain self-center"
        />
      </div>
      <div className="flex flex-row space-x-5 justify-items-end mr-10">
        <h1 className="self-center text-sm">Terms of Use</h1>
        <h1 className="self-center text-sm">Privacy Policy</h1>
      </div>
    </footer>
  );
};

export default Footer;
