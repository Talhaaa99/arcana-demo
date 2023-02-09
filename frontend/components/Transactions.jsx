import { AuthProvider } from "@arcana/auth";
import { ethers, utils } from "ethers";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { initialChains } from "../atom/contentAtom";

const Transactions = () => {
  const [toAddress, setToAddress] = useState(
    "0xDCE58694B84E7B955A0bee0bf5dA5d0d864e1eb6"
  );
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("Hello Arcanauts");
  const chain = useRecoilValue(initialChains);

  const appAddress = "bad424ac9d22202f07a742efaa36c865260d28f2";

  const auth = new AuthProvider(`${appAddress}`, {
    position: "right", // defaults to right
    theme: "light", // defaults to dark
    alwaysVisible: true, // defaults to true which is Full UI mode
    chainConfig: {
      chainId: chain,
      rpcUrl: "https://polygon-rpc.com/",
    },
  });

  async function signTransaction() {
    try {
      await auth.init();
      const provider = auth.provider;
      const { address } = await auth.getUser();
      console.log(address);
      const { sig } = await provider.request({
        method: "eth_signTransaction",
        params: [
          {
            from: address, // sender account address
            gasPrice: 0,
            to: "0xDCE58694B84E7B955A0bee0bf5dA5d0d864e1eb6", // receiver account address
            value: ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message)),
          },
        ],
      });
      console.log({ sig });
    } catch (error) {
      console.error(error);
    }
  }

  async function sendTransaction() {
    try {
      await auth.init();
      const provider = auth.provider;
      const { address } = await auth.getUser();
      const hash = await provider.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            gasPrice: 0,
            to: toAddress,
            value: utils.hexlify(amount),
          },
        ],
      });
      console.log({ hash });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="text-white">
      {/*  Send tokens/Approval */}
      <div>
        <h1>To</h1>
        <input
          placeholder="To Address"
          onChange={(e) => setToAddress(e.target.value)}
          value={toAddress}
          className="text-slate-700"
        />
        <h1>Amount</h1>
        <input
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className="text-slate-700"
        />
      </div>
      <button className="btn" onClick={() => sendTransaction()}>
        Send token
      </button>
      <br></br>
      {/* Request signature */}
      <div>
        <h1>Message</h1>
        <input
          placeholder="Hello Arcanauts"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="text-slate-700"
        />
      </div>
      <button className="btn" onClick={() => signTransaction()}>
        Request signature
      </button>
    </div>
  );
};

export default Transactions;
