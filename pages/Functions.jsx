import { useAuth } from "@arcana/auth-react";

import React from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { contentState } from "../atom/contentAtom";
import Chains from "../components/Chains";
import FunctionSidebar from "../components/FunctionSidebar";
import GetAccounts from "../components/GetAccounts";

import Tokens from "../components/Tokens";
import Transactions from "../components/Transactions";

const EthCrypto = require("eth-crypto");

const Functions = () => {
  const auth = useAuth();
  const [activeContent, setActiveContent] = useState("token");
  const [encKey, setEncKey] = useState("");
  const [decKey, setDecKey] = useState("");
  const [message, setMessage] = useState("Hello world");

  const publicKey = auth?.user?.publicKey;
  const encryptionPublicKey = publicKey?.slice(2, publicKey.length);
  console.log(encryptionPublicKey);

  /* Encrypt */

  const encryptFn = async () => {
    auth.isLoggedIn;
    const encrypted = await EthCrypto.encryptWithPublicKey(
      encryptionPublicKey,
      message // message
    );
    console.log(EthCrypto.cipher.stringify(encrypted));
    const stringifiedKey = EthCrypto.cipher.stringify(encrypted);
    setEncKey(stringifiedKey);
  };
  const decrypt = async () => {
    arcana.provider
      .request({
        method: "eth_decrypt",
        params: [encKey, auth?.user?.address],
      })
      .then((decryptedMessage) => setDecKey(decryptedMessage))
      .catch((error) => console.log(error.message));
  };

  const handleInputEncrypt = async (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <div className="absolute ml-[240px] p-10 w-auto h-auto text-slate-200 flex space-x-4 flex-row max-w-5xl ">
      <div className="relative min-w-[1100px] h-[700px] card flex flex-row  break-normal space-y-3 bg-[#26272A]">
        <div className="p-8">
          <FunctionSidebar setActiveContent={setActiveContent} />
        </div>
        {activeContent === "decrypt" ? (
          <div className="flex flex-col">
            <h1 className="font-bold text-blue-600">
              Input message to encrypt
            </h1>
            <input
              type="text"
              value={message}
              onChange={handleInputEncrypt}
              className="input-field text-gray-600"
              placeholder="Ready to encrypt"
            />
            <button onClick={encryptFn} className="btn">
              Encrypt now
            </button>
            <p className="text-slate-200 w-auto">
              <h1 className="text-blue-600 font-semibold mb-2">
                Encrypted message:
              </h1>{" "}
              {encKey.slice(0, 26) + "..."}
            </p>
            <button className="btn" onClick={decrypt}>
              Decrypt key using Arcana auth
            </button>
            <h1 className="text-blue-600 font-semibold mb-2">
              Decrypted message:
            </h1>
            <p className="text-slate-200 break-normal">{decKey}</p>
          </div>
        ) : null}
        {activeContent === "token" ? <Tokens /> : null}
        {activeContent === "chain" ? <Chains /> : null}
        {activeContent === "accountDetails" ? <GetAccounts /> : null}
        {activeContent === "transactions" ? <Transactions /> : null}
      </div>
    </div>
  );
};

export default Functions;
