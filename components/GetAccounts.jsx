import { useAuth } from "@arcana/auth-react";
import React, { useState } from "react";

const GetAccounts = () => {
  const { availableLogins, logo, user } = useAuth();
  const [account, setAccount] = useState("");
  const [publicKey, setPublicKey] = useState("");
  return (
    <div className="text-white space-y-4 p-6 flex-col max-w-[600px]">
      <div className="flex flex-col break-words">
        <button className="btn" onClick={() => setAccount(user.address)}>
          Get accounts
        </button>
        <p className="">{account}</p>
      </div>
      <div className="flex flex-col break-words">
        <button className="btn" onClick={() => setPublicKey(user.publicKey)}>
          Get Public Key
        </button>
        <p className="">{publicKey}</p>
      </div>
    </div>
  );
};

export default GetAccounts;
