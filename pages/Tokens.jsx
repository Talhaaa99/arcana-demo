import { useAuth } from "@arcana/auth-react";
import React, { useState } from "react";
import Transactions from "../components/Transactions";

const Tokens = () => {
  const [tokenAddress, setTokenAddress] = useState(
    "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
  );
  const [tokenSymbol, setTokenSymbol] = useState("FOO");
  const [tokenImage, setTokenImage] = useState(
    "https://foo.io/token-image.svg"
  );
  const auth = useAuth();

  const addToken = async () => {
    try {
      const provider = auth.provider;
      const hash = await provider.request({
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
      console.log(hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white absolute ml-[240px] flex flex-row justify-center p-6 space-x-4">
      <div className="card max-w-xs flex flex-col space-y-2">
        <h1 className="font-bold text-blue-600">Add custom token</h1>
        <p className="mb-2">
          Add your custom tokens using Token symbol, address and an image url{" "}
        </p>
        <h1 className="font-bold text-blue-600">Send token</h1>
        <p className="mb-2">Enter an amount and address, and transfer tokens</p>
        <h1 className="font-bold text-blue-600">Request signature</h1>
        <p className="mb-2">
          Request a signature for approval with a custom message
        </p>
      </div>
      <div className="space-y-3 card">
        <h1 className="text-blue-600 font-bold">Add Token</h1>
        <div>
          <h1>Token Address</h1>
          <input
            type="text"
            value={tokenAddress}
            className="text-black input-field"
            onChange={(e) => setTokenAddress(e.target.value)}
          />
        </div>
        <div>
          <h1>Token Symbol</h1>
          <input
            type="text"
            value={tokenSymbol}
            className="text-black input-field"
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>
        <div>
          <h1>Token Image URL</h1>
          <input
            type="text"
            value={tokenImage}
            className="text-black input-field"
            onChange={(e) => setTokenImage(e.target.value)}
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
