import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

import getAuth from "../lib/getAuth";
import Link from "next/link";

function Navbar() {
  const [connected, toggleConnect] = useState(false);

  const [currAddress, updateAddress] = useState("0x");

  const auth = getAuth();

  async function getAddress() {
    const ethers = require("ethers");
    await auth.init();
    const arcanaProvider = auth.provider;
    const provider = new ethers.providers.Web3Provider(arcanaProvider);
    const signer = provider.getSigner();
    const accounts = await auth.provider.request({
      method: "eth_requestAccounts",
    });
    const addr = accounts[0];
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-green-70");
    ethereumButton.classList.add("bg-green-500");
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x5") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");
        getAddress();
      });
  }

  useEffect(() => {
    let val = window.ethereum.isConnected();
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }
  });

  return (
    <div className="absolute z-30 w-[75%] h-[20px]">
      <nav className="relative flex- flex-col w-[800px]">
        <ul className="flex items-end justify-between bg-transparent text-white pr-5">
          <li className="flex items-end ml-5 pb-2">
            <Link href="/NFT/NFTMarketplace">
              <div className="inline-block font-bold text-xl ml-2">
                NFT Marketplace
              </div>
            </Link>
          </li>
          <li className="w-2/6">
            <ul className="lg:flex justify-between font-bold mr-10 text-lg">
              <li className="border-b-2 hover:pb-0 p-2">
                <Link href="/NFT/NFTMarketplace">Marketplace</Link>
              </li>

              <li className="border-b-2 hover:pb-0 p-2">
                <Link href="/NFT/SellNFT">List NFT</Link>
              </li>

              <li className="border-b-2 hover:pb-0 p-2">
                <Link href="/NFT/Profile">Profile</Link>
              </li>
              <li>
                <button
                  className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                  onClick={connectWebsite}
                >
                  {connected ? "Connected" : "Connect Wallet"}
                </button>
              </li>
            </ul>
          </li>
        </ul>
        <div className="text-white text-bold text-right text-sm">
          {currAddress !== "0x"
            ? "Connected to"
            : "Not Connected. Please login to view NFTs"}{" "}
          {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
