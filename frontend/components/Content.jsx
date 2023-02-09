import React from "react";
import { useRecoilValue } from "recoil";
import { contentState } from "../atom/contentAtom";
import Homepage from "./Homepage";
import LoginMethods from "./LoginMethods";
import NFTPage from "./NFTPage";
import Transactions from "./Transactions";
import UseCases from "./UseCases";

const Content = () => {
  const content = useRecoilValue(contentState);

  return (
    <div className="border-2 border-white flex flex-grow">
      {content === "login" ? <LoginMethods /> : null}
      {content === "homepage" ? <Homepage /> : null}
      {content === "use-cases" ? <UseCases /> : null}
      {content === "transactions" ? <Transactions /> : null}
      {content === "NFT" ? <NFTPage /> : null}
    </div>
  );
};

export default Content;
