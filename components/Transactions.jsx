import { useAuth } from "@arcana/auth-react";
import { ethers, utils } from "ethers";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const [toAddress, setToAddress] = useState(
    "0xDCE58694B84E7B955A0bee0bf5dA5d0d864e1eb6"
  );
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState("Hello Arcanauts");

  const auth = useAuth();

  async function signTransaction() {
    try {
      const provider = auth.provider;
      const address = auth.user.address;
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
      const provider = auth.provider;
      const address = auth.user.address;
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
      <div className="card flex space-y-2 flex-col">
        <h1 className="text-blue-600 font-bold">Send Token</h1>
        <p>To</p>
        <input
          placeholder="To Address"
          onChange={(e) => setToAddress(e.target.value)}
          value={toAddress}
          className="text-slate-700 input-field px-2 py-1"
        />
        <p>Amount</p>
        <input
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className="text-slate-700 input-field px-2 py-1"
        />
        <button className="btn" onClick={sendTransaction}>
          Send token
        </button>
      </div>
      <br></br>
      {/* Request signature */}
      <div className="card flex flex-col space-y-2">
        <p className="text-blue-600 font-bold">Message</p>
        <input
          placeholder="Hello Arcanauts"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="text-slate-700 input-field px-2 py-1"
        />
        <button className="btn" onClick={() => signTransaction()}>
          Request signature
        </button>
      </div>
    </div>
  );
};

export default Transactions;
