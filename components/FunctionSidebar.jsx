import React from "react";

const FunctionSidebar = ({ setActiveContent }) => {
  return (
    <div className="w-[254px] h-auto space-y-5">
      <p
        className="font-light hover:cursor-pointer"
        onClick={() => setActiveContent("token")}
      >
        Tokens
      </p>
      <p
        className="font-light hover:cursor-pointer"
        onClick={() => setActiveContent("accountDetails")}
      >
        Account functions
      </p>

      <p
        className="font-light hover:cursor-pointer"
        onClick={() => setActiveContent("chain")}
      >
        Add/Switch Chain
      </p>

      <p
        className="font-light hover:cursor-pointer"
        onClick={() => setActiveContent("transactions")}
      >
        Transactions
      </p>
      <p
        className="font-light hover:cursor-pointer"
        onClick={() => setActiveContent("decrypt")}
      >
        Encrypt/Decrypt
      </p>
    </div>
  );
};

export default FunctionSidebar;
