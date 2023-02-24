import React from "react";
import { useRecoilValue } from "recoil";
import { contentState } from "../atom/contentAtom";
import Login from "./Login";
import Transactions from "./Transactions";
import UseCases from "./UseCases";

const Content = () => {
  const content = useRecoilValue(contentState);

  return (
    <div className="border-2 border-white flex flex-grow">
      {content === "login" ? <Login /> : null}
      {content === "use-cases" ? <UseCases /> : null}
      {content === "transactions" ? <Transactions /> : null}
    </div>
  );
};

export default Content;
