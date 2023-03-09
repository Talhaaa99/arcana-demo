import { useAuth } from "@arcana/auth-react";
import e from "cors";

import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const EthCrypto = require("eth-crypto");

const Functions = () => {
  const auth = useAuth();
  const [encKey, setEncKey] = useState("");
  const [decKey, setDecKey] = useState("");
  const [message, setMessage] = useState("Hello world");

  const publicKey = auth?.user?.publicKey;
  const encryptionPublicKey = publicKey?.slice(2, publicKey.length);
  console.log(encryptionPublicKey);
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

  const handleInput = async (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  return (
    <div className="absolute ml-[240px] p-10 w-[900px] text-slate-200 flex space-x-4 flex-row max-w-5xl h-auto">
      <div className="card flex max-w-xs flex-col  break-normal space-y-3">
        <h1 className="font-bold text-blue-600">
          Decrypting encrypted messages:
        </h1>
        <p>
          Messages that have been encrypted using your wallet public key can be
          decrypted via Arcana wallet decrypt method <br />
          Try it out with a custom message to decrypt
        </p>
      </div>
      <div className="card flex max-w-xs flex-col  break-normal space-y-3">
        <h1 className="font-bold text-blue-600">Input message to encrypt</h1>
        <input
          type="text"
          value={message}
          onChange={handleInput}
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
        <h1 className="text-blue-600 font-semibold mb-2">Decrypted message:</h1>
        <p className="text-slate-200 break-normal">{decKey}</p>
      </div>
    </div>
  );
};

export default Functions;
