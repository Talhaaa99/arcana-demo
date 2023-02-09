import { AuthProvider } from "@arcana/auth";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { chainId, chainName, initialChains, rpcUrl } from "../atom/contentAtom";

const Homepage = () => {
  const [addChainId, setAddChainId] = useRecoilState(chainId);
  const [addChainName, setAddChainName] = useRecoilState(chainName);
  const [addRpcUrl, setAddRpcUrl] = useRecoilState(rpcUrl);
  const [tokenAddress, setTokenAddress] = useState(
    "0xB983E01458529665007fF7E0CDdeCDB74B967Eb6"
  );
  const [tokenSymbol, setTokenSymbol] = useState("FOO");
  const [tokenImage, setTokenImage] = useState(
    "https://foo.io/token-image.svg"
  );
  const [nftAddress, setNftAddress] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [nftImage, setNftImage] = useState("");

  const chain = useRecoilValue(initialChains);

  const appAddress = "bad424ac9d22202f07a742efaa36c865260d28f2";

  const auth = new AuthProvider(`${appAddress}`, {
    position: "right", // defaults to right
    theme: "dark", // defaults to dark
    alwaysVisible: true, // defaults to true which is Full UI mode
    chainConfig: {
      chainId: chain,
      rpcUrl: "https://polygon-rpc.com/",
    },
  });

  const addChain = async () => {
    try {
      await auth.init();
      const provider = auth.provider;
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: addChainId,
            chainName: addChainName,
            rpcUrls: [addRpcUrl],
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
  };
  const addNFT = async () => {
    await auth.init();
    const provider = auth.provider;
    await provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC-721",
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: 18,
          image: tokenImage,
        },
      },
    });
  };

  return (
    <div className="text-white flex space-x-5 justify-center align-middle p-8">
      {/* Add chain */}

      <div className="space-y-3 mb-3 self-center">
        <h1>Add Chain</h1>
        <div>
          <p>Chain ID</p>
          <input
            placeholder={addChainId}
            type="text"
            onChange={(e) => setAddChainId(e.target.value)}
            value={addChainId}
            className="text-black"
          />
        </div>
        <div>
          <p>Chain Name</p>

          <input
            placeholder={addChainName}
            type="text"
            onChange={(e) => setAddChainName(e.target.value)}
            value={addChainName}
            className="text-black"
          />
        </div>
        <div>
          <p>RPC Url</p>

          <input
            placeholder={addRpcUrl}
            type="text"
            onChange={(e) => setAddRpcUrl(e.target.value)}
            value={addRpcUrl}
            className="text-black"
          />
        </div>
        <button className="btn" onClick={addChain}>
          Click to add chain
        </button>
      </div>

      {/* Switch chain */}

      <div className="self-center">
        <button className="btn mb-3" onClick={switchChain}>
          Switch Chain
        </button>
      </div>

      {/* Add token */}

      <div className="space-y-3 self-center">
        <h1>Add Token</h1>
        <div>
          <h1>Token Address</h1>
          <input type="text" value={tokenAddress} className="text-black" />
        </div>
        <div>
          <h1>Token Symbol</h1>
          <input type="text" value={tokenSymbol} className="text-black" />
        </div>
        <div>
          <h1>Token Image URL</h1>
          <input type="text" value={tokenImage} className="text-black" />
        </div>
        <button className="btn" onClick={addToken}>
          Click to add token
        </button>
      </div>

      {/* Add NFT */}

      <div className="space-y-3 self-center">
        <h1>Add NFT Token</h1>
        <div>
          <h1>Token Address</h1>
          <input type="text" value={nftAddress} className="text-black" />
        </div>
        <div>
          <h1>Token Symbol</h1>
          <input type="text" value={nftSymbol} className="text-black" />
        </div>
        <div>
          <h1>Token Image URL</h1>
          <input type="text" value={nftImage} className="text-black" />
        </div>
        <button className="btn" onClick={addNFT}>
          Click to add NFT token
        </button>
      </div>
    </div>
  );
};

export default Homepage;
