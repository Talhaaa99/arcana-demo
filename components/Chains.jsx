import { CHAIN } from "@arcana/auth";
import { useAuth } from "@arcana/auth-react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  blockUrl,
  chainId,
  chainName,
  rpcUrl,
  name,
  symbol,
} from "../atom/contentAtom";

const Chains = () => {
  const [addChainId, setAddChainId] = useRecoilState(chainId);
  const [addChainName, setAddChainName] = useRecoilState(chainName);
  const [addRpcUrl, setAddRpcUrl] = useRecoilState(rpcUrl);
  const [addBlockUrl, setAddBlockUrl] = useRecoilState(blockUrl);
  const [currencyName, setCurrencyName] = useRecoilState(name);
  const [currencySymbol, setCurrencySymbol] = useRecoilState(symbol);

  const [nftAddress, setNftAddress] = useState(
    "0x331E5ebA1606bA55956c90D78A2622ae027FA53C"
  );
  const [nftSymbol, setNftSymbol] = useState("Net2Dev NFT Collection");
  const [nftImage, setNftImage] = useState("");

  const auth = useAuth();

  const addChain = async () => {
    try {
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
      const provider = auth.provider;
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAIN.POLYGON_MUMBAI_TESTNET }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addNFT = async () => {
    try {
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
    <div className="text-white flex flex-row p-6 space-x-4">
      {/* Add chain */}

      <div className="space-y-3 card">
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

export default Chains;
