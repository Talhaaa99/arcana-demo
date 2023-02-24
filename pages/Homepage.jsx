import { AuthProvider, CHAIN } from "@arcana/auth";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ArcanaAuth,
  blockUrl,
  chainId,
  chainName,
  initialChains,
  rpcUrl,
  name,
  symbol,
} from "../atom/contentAtom";
import Login from "../components/Login";
import GetAuth from "../lib/getAuth";

const Homepage = () => {
  const [addChainId, setAddChainId] = useRecoilState(chainId);
  const [addChainName, setAddChainName] = useRecoilState(chainName);
  const [addRpcUrl, setAddRpcUrl] = useRecoilState(rpcUrl);
  const [addBlockUrl, setAddBlockUrl] = useRecoilState(blockUrl);
  const [currencyName, setCurrencyName] = useRecoilState(name);
  const [currencySymbol, setCurrencySymbol] = useRecoilState(symbol);
  const [tokenAddress, setTokenAddress] = useState(
    "0xB983E01458529665007fF7E0CDdeCDB74B967Eb6"
  );
  const [tokenSymbol, setTokenSymbol] = useState("FOO");
  const [tokenImage, setTokenImage] = useState(
    "https://foo.io/token-image.svg"
  );
  const [nftAddress, setNftAddress] = useState(
    "0x331E5ebA1606bA55956c90D78A2622ae027FA53C"
  );
  const [nftSymbol, setNftSymbol] = useState("Net2Dev NFT Collection");
  const [nftImage, setNftImage] = useState("");

  const chain = useRecoilValue(initialChains);
  const auth = GetAuth();

  const appAddress = "bad424ac9d22202f07a742efaa36c865260d28f2";

  const addChain = async () => {
    try {
      await auth.init();
      const provider = auth.provider;
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: addChainId, // A 0x-prefixed hexadecimal string
            chainName: addChainName,
            nativeCurrency: {
              name: currencyName,
              symbol: currencySymbol, // 2-6 characters long
              decimals: 18,
            },
            rpcUrls: [addRpcUrl],
            blockExplorerUrls: [addBlockUrl],
          },
        ],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const switchChain = async () => {
    try {
      await auth.init();
      const provider = auth.provider;
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: addChainId }],
      });
    } catch (error) {
      console.error(error);
    }
  };

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
  const addNFT = async () => {
    try {
      await auth.init();
      const provider = auth.provider;
      await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC721",
          options: {
            address: nftAddress,
            symbol: nftSymbol,
            decimals: 18,
            image: nftImage,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-white absolute ml-[240px] flex flex-row justify-center p-6 space-x-4">
      {/* Add chain */}

      <div className="space-y-3 self-center">
        <h1>Add Chain</h1>
        <div>
          <p>Chain ID</p>
          <input
            placeholder={addChainId}
            type="text"
            onChange={(e) => setAddChainId(e.target.value)}
            value={addChainId}
            className="text-black input-field"
          />
        </div>
        <div>
          <p>Chain Name</p>

          <input
            placeholder={addChainName}
            type="text"
            onChange={(e) => setAddChainName(e.target.value)}
            value={addChainName}
            className="text-black input-field"
          />
        </div>
        <div>
          <p>RPC Url</p>

          <input
            placeholder={addRpcUrl}
            type="text"
            onChange={(e) => setAddRpcUrl(e.target.value)}
            value={addRpcUrl}
            className="text-black input-field"
          />
        </div>
        <button className="btn" onClick={addChain}>
          Click to add chain
        </button>
        {/* Switch chain */}

        <div>
          <button className="btn mb-3" onClick={switchChain}>
            Switch Chain
          </button>
        </div>
      </div>

      {/* Add token */}

      <div className="space-y-3 self-center">
        <h1>Add Token</h1>
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
            onChange={() => set}
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

      {/* Login Methods */}
      <div>
        <Login />
      </div>

      {/* Add NFT */}

      {/* <div className="space-y-3">
          <h1>Add NFT Token</h1>
          <div>
            <h1>Token Address</h1>
            <input type="text" value={nftAddress} className="text-black" />
          </div>
          <div>
            <h1>Token Symbol</h1>
            <input type="text" value={nftSymbol} className="text-black" />
          </div>
          <button className="btn" onClick={() => addNFT()}>
            Click to add NFT token
          </button>
        </div> */}
    </div>
  );
};

export default Homepage;
