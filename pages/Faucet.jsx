import { useAuth } from "@arcana/auth-react";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import faucetContract from "../lib/faucet";

const Faucet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [transactionData, setTransactionData] = useState("");

  const { provider, user, loading, isLoggedIn, connect } = useAuth();

  useEffect(() => {
    getCurrentWalletConnected();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (!isLoggedIn) {
      try {
        /* get provider */
        const connected = await connect();
        const arcanaProvider = provider;
        const provider = new ethers.providers.Web3Provider(arcanaProvider);
        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);
        /* get signer */
        setSigner(provider.getSigner());
        /* local contract instance */
        setFcContract(faucetContract(provider));
        /* set active wallet address */
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      const arcanaProvider = await provider;
      const ethersProvider = new ethers.providers.Web3Provider(arcanaProvider);
      /* get accounts */
      const account = user.address;
      /* get signer */
      setSigner(ethersProvider.getSigner());
      /* local contract instance */
      setFcContract(faucetContract(ethersProvider));
      /* set active wallet address */
      setWalletAddress(account);
    }
  };

  const getCurrentWalletConnected = async () => {
    if (!isLoggedIn) {
      try {
        /* get provider */
        const arcanaProvider = provider;
        const provider = new ethers.providers.Web3Provider(arcanaProvider);
        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);
        if (accounts.length > 0) {
          /* get signer */
          setSigner(provider.getSigner());
          /* local contract instance */
          setFcContract(faucetContract(provider));
          /* set active wallet address */
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect Wallet button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getOCTHandler = async () => {
    setWithdrawError("");
    setWithdrawSuccess("");
    try {
      const fcContractWithSigner = fcContract.connect(signer);
      const resp = await fcContractWithSigner.requestTokens();
      setWithdrawSuccess("Operation succeeded - enjoy your tokens!");
      setTransactionData(resp.hash);
    } catch (err) {
      setWithdrawError(err.message);
    }
  };
  return (
    <div className="absolute ml-[240px] text-white p-10">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="navbar-item is-size-4">Ocean Token (OCT)</h1>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end is-align-items-center">
              <button
                className="button is-white connect-wallet"
                onClick={connectWallet}
              >
                <span className="is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero is-fullheight">
        <div className="faucet-hero-body">
          <div className="container has-text-centered main-content">
            <h1 className="title is-1">Faucet</h1>
            <p>Fast and reliable. 50 OCT/day.</p>
            <div className="mt-5">
              {withdrawError && (
                <div className="withdraw-error">{withdrawError}</div>
              )}
              {withdrawSuccess && (
                <div className="withdraw-success">{withdrawSuccess}</div>
              )}{" "}
            </div>
            <div className="box address-box">
              <div className="columns">
                <div className="column is-four-fifths">
                  <input
                    className="input-field text-gray-700"
                    type="text"
                    placeholder="Enter your wallet address (0x...)"
                    defaultValue={walletAddress}
                  />
                </div>
                <div className="column">
                  <button
                    className="button is-link is-medium"
                    onClick={getOCTHandler}
                    disabled={walletAddress ? false : true}
                  >
                    GET TOKENS
                  </button>
                </div>
              </div>
              <article className="panel is-grey-darker">
                <p className="panel-heading">Transaction Data</p>
                <div className="panel-block">
                  <p>
                    {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col space-y-3">
        <Link
          href="https://faucet.polygon.technology/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <button className="btn">Polygon Faucet</button>
        </Link>
        <Link
          href="https://mumbaifaucet.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <button className="btn">Alchemy Faucet</button>
        </Link>
        <Link
          href="https://sepoliafaucet.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <button className="btn">Sepolia Faucet</button>
        </Link>
      </div>
    </div>
  );
};

export default Faucet;
