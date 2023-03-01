import React, { useState } from "react";
import Transactions from "../components/Transactions";
import getAuth from "../lib/getAuth";

const Tokens = () => {
  const [tokenAddress, setTokenAddress] = useState(
    "0xB983E01458529665007fF7E0CDdeCDB74B967Eb6"
  );
  const [tokenSymbol, setTokenSymbol] = useState("FOO");
  const [tokenImage, setTokenImage] = useState(
    "https://foo.io/token-image.svg"
  );
  const auth = getAuth();

  const addToken = async () => {
    try {
      await auth.init();
      const provider = auth.provider;
      await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: tokenAddress,
            symbol: tokenSymbol,
            decimals: 18,
            image: tokenImage,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white absolute ml-[240px] flex flex-row justify-center p-6 space-x-4">
      <div className="space-y-3 card">
        <h1 className="text-blue-600 font-bold">Add Token</h1>
        <div>
          <h1>Token Address</h1>
          <input
            type="text"
            value={tokenAddress}
            className="text-black input-field"
            onChange={() => setTokenAddress(e.target.value)}
          />
        </div>
        <div>
          <h1>Token Symbol</h1>
          <input
            type="text"
            value={tokenSymbol}
            className="text-black input-field"
            onChange={() => setTokenSymbol(e.target.value)}
          />
        </div>
        <div>
          <h1>Token Image URL</h1>
          <input
            type="text"
            value={tokenImage}
            className="text-black input-field"
            onChange={() => set}
          />
        </div>
        <button className="btn" onClick={addToken}>
          Click to add token
        </button>
      </div>
      <Transactions />
    </div>
  );
};

export default Tokens;
