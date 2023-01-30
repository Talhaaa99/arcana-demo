import { Modal } from "@mui/material";
import { useState } from "react";

const Intro = () => {
  const [openIntro, setOpenIntro] = useState(true);

  const handleCloseIntro = async () => {
    setOpenIntro(false);
  };
  const handleOpenIntro = async () => {
    setOpenIntro(true);
  };

  return (
    <Modal
      open={openIntro}
      onClose={handleCloseIntro}
      className="m-auto w-[926px] h-[595px] text-[#F7F7F7] z-60 bg-[#26272A]"
    >
      <div className="flex flex-col mx-auto py-[72px] px-16 h-full">
        <h1 className="mx-auto text-[40px] tracking-wider mb-[30px]">
          Welcome to Demo App
        </h1>
        <p className="text-[#C0C0C8] mx-auto text-center tracking-widest mb-[72px]">
          Welcome to our demo app, where you will have the opportunity to
          explore the full capabilities of our APIs and SDK.
          <br />
          <br />
          This app is designed to showcase the full range of possibilities and
          give you a sense of how you can use our tools to enhance your own
          applications.
          <br />
          <br />
          So, if you&apos;re curious about what we can do, look no further!
          You&apos;ll find answers to all your questions right here. Let&apos;s
          get started!
        </p>
        <button onClick={handleCloseIntro} className="mx-auto btn w-[110px]">
          PROCEED
        </button>
      </div>
    </Modal>
  );
};

export default Intro;
