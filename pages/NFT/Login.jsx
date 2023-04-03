import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import Marketplace from "../.././src/Marketplace.json";
import truncateEthAddress from "truncate-eth-address";
import Image from "next/image";
import { Modal } from "@mui/material";
import { FaDiscord } from "react-icons/fa";
import { useAuth } from "@arcana/auth-react";
import axios from "axios";
import { getETHPrice } from "../../lib/getEthPrice";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showKey, setShowkey] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [NFTImage, setNFTImage] = useState("/NFTDefault.png");
  const [pfp, setPfp] = useState("/pfp-default.png");
  const [NFTTitle, setNFTTitle] = useState("Random Artwork #2323");
  const [owner, setOwner] = useState("0x00000...000");
  const [price, setPrice] = useState("0.01");
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);

  const {
    provider,
    loading,
    isLoggedIn,
    theme,
    user,
    logout,
    loginWithSocial,
    loginWithLink,
    connect,
    logo,
  } = useAuth();

  useEffect(() => {
    if (loading === false) {
      isLoggedIn;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstModal]);

  /*   useEffect(() => {
    const load = async () => {
      if (isInitialized) {
        const loggedIn = await auth.isLoggedIn();
        if (loggedIn) {
          setLoggedIn(true);
          const acc = await getAccountInfo();
          setAccount(acc);
        } else {
          setLoggedIn(false);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]); */

  const connectWallet = async () => {
    isLoggedIn;
    const connected = await connect();
  };

  const getAccountInfo = async () => {
    const address = user?.address;
    /* setUserInfo(!userInfo);
    setEmail(auth.user.email);
    setName(auth.user.name);
    setPicture(auth.user.picture); */
    console.log("Address is: ", address);
    setAddress(address);
  };
  const getPublicKey = async () => {
    const publicKey = await auth.getPublicKey(email);
    setPKey(publicKey);
    setShowkey(!showKey);
  };

  // demo app functions

  const socialLogin = async (socialAuth) => {
    const social = await loginWithSocial(socialAuth);
    isLoggedIn;
    getAccountInfo();
    return social;
  };

  const emailLogin = async (emailAuth) => {
    return await loginWithLink(emailAuth);
  };

  const handleEmailLogin = async (e) => {
    setEmailInput(e.target.value);
  };

  const openFirstModal = async () => {
    setFirstModal(true);
  };

  const closeFirstModal = async () => {
    setFirstModal(false);
    getAccountInfo();
  };
  const openSecondModal = async () => {
    setSecondModal(true);
  };
  const closeSecondModal = async () => {
    setSecondModal(false);
  };

  const handleLogOut = async () => {
    logout();
    setPfp("/pfp-default.png");
    setNFTTitle("Random Artwork #2323");
    setOwner("0x00000...000");
    setPrice("0.01");
  };

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    if (!isLoggedIn) {
      alert("Please connect wallet first");
    }
    const arcanaProvider = new ethers.providers.Web3Provider(provider);
    const signer = await arcanaProvider.getSigner();
    //Pull the deployed contract instance
    const marketplaceContract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );
    //create an NFT Token
    const transaction = await marketplaceContract.getAllNFTs();
    console.log("Transaction data:", transaction);

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        console.log("Token URI is ", tokenURI);
        const meta = (await axios.get(tokenURI)).data;
        console.log("meta data", meta);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
  }

  console.log("Data from marketplace", data);
  if (isLoggedIn && loading === false && !dataFetched) {
    getAllNFTs();
    console.log(data);
  }

  return (
    <div className="w-auto absolute z-20 ml-[240px] h-full p-10 flex">
      <div className="w-[1109px] h-5/6 m-auto relative rounded-2xl shadow-xl bg-white">
        <nav className="flex justify-between p-10">
          <div className="flex justify-evenly align-center space-x-6">
            <p className="font-bold text-lg self-center text-[#16161A]">
              NFT Picker
            </p>
            <input
              className="input-field border-none self-center bg-[#F6F6F6]"
              type="search"
              placeholder="Search"
            ></input>
            <Link
              href="/NFT/NFTMarketplace"
              className="self-center text-[#777777]"
            >
              <p>Explore</p>
            </Link>
            <Link href="/NFT/SellNFT" className="self-center text-[#777777]">
              <p>Create</p>
            </Link>
          </div>
          {isLoggedIn && !loading ? (
            <button
              className="px-5 py-3 bg-[#16161A] font-sora rounded-2xl text-white"
              onClick={handleLogOut}
            >
              {user?.address.slice(0, 7) +
                "..." +
                user?.address.slice(35, address?.length - 1)}
            </button>
          ) : (
            <button
              className="px-5 py-3 bg-[#16161A] font-sora rounded-2xl text-white"
              onClick={openFirstModal}
            >
              Connect Wallet
            </button>
          )}
        </nav>
        <div className="flex flex-row justify-between p-10">
          <Image
            height={445}
            width={445}
            alt="NFT"
            className="max-h-[445px] max-w-[445px] object-contain p-2 "
            src={dataFetched ? data[data.length - 1].image : NFTImage}
          />

          <div className="flex flex-col space-y-6">
            <h1 className="font-bold text-2xl">
              {dataFetched ? data[data.length - 1].name : NFTTitle}
            </h1>
            <div className="flex flex-row gap-2">
              <Image
                height={37}
                width={37}
                className="rounded-full"
                alt="Pfp"
                src={dataFetched ? logo : pfp}
              />
              <div>
                <p className="text-[#A9A5A5] text-xs ">Current Owner</p>
                <p className="font-semibold">
                  {dataFetched ? data[data.length - 1].owner : owner}
                </p>
              </div>
            </div>
            <div className="flex flex-col rounded-xl border border-[#D9D9D9] h-[263px] w-[384px] py-6 px-4 space-y-4">
              <div className="flex flex-row space-x-2">
                <div className="bg-[#F6F6F6] p-5 space-y-[9px] w-[172px] rounded-2xl">
                  <p className="font-semibold text-xs text-[#A9A5A5]">Price</p>
                  <p>{dataFetched ? data[data.length - 1].price : price} ETH</p>
                  <p className="font-semibold text-xs text-[#A9A5A5]">2$</p>
                </div>
                <div className="bg-[#F6F6F6] p-5 space-y-[9px] w-[172px] rounded-2xl">
                  <p className="font-semibold text-xs text-[#A9A5A5]">
                    Highest floor bid
                  </p>
                  <p>0.02 ETH</p>
                  <p className="font-semibold text-xs text-[#A9A5A5]">
                    By: 0x00000000
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Link href="/NFT/NFTMarketplace" className="w-full">
                  <button className="btn w-full shadow-md">
                    Head to the marketplace to buy now for{" "}
                    {dataFetched ? data[data.length - 1].price : price} ETH
                  </button>
                </Link>
                <button className="btn w-full bg-white text-black shadow-md border-1 border-[#D9D9D9]">
                  Place a bid
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal stuff */}

      <Modal
        open={firstModal}
        onClose={closeFirstModal}
        disableAutoFocus={true}
        className="flex align-middle h-[200px] flex-col mx-auto mt-80 justify-center w-[300px] bg-gray-600 rounded-xl focus:border-none"
      >
        <div className="justify-center flex flex-col space-y-2">
          <button className="btn self-center" onClick={connectWallet}>
            Plug and Play
          </button>
          <button className="btn self-center" onClick={openSecondModal}>
            Use Custom login with Arcana Auth
          </button>
        </div>
      </Modal>
      <Modal
        open={secondModal}
        onClose={closeSecondModal}
        className="w-[332px] h-[572px]  m-auto rounded-xl"
      >
        <div className="p-6 flex flex-col h-full justify-center bg-[#F9F9F9] rounded-2xl">
          <div className="flex flex-col space-y-2 mb-3">
            <Image
              src="/demo-logo.png"
              height={53}
              width={53}
              alt="logo"
              className="self-center"
            />
            <h1 className="font-bold text-xl leading-6 font-montserrat self-center">
              Welcome
            </h1>
          </div>

          {/* Email Login */}

          <div className="w-full flex flex-col mb-6">
            <h1 className="text-[10.62px] leading-3 text-[#101010] self-center tracking-wide mb-7">
              We&apos;ll email you a login link for a password-free sign in.
            </h1>
            <h1 className="text-sm mb-1 text-[#8D8D8D]">Email</h1>
            <input
              className="rounded-lg w-[278px] border-none placeholder-opacity-25 bg-[#EEEEEE] mb-4"
              value={emailInput}
              type="text"
              placeholder="talha@newfang.io"
              onChange={handleEmailLogin}
            />
            <button
              className="btn justify-center rounded-[8.85px] bg-black text-[#F7F7F7] font-sora"
              onClick={() => emailLogin(emailInput)}
            >
              GET LINK
            </button>
          </div>

          {/* Or divider */}

          <div className="flex space-x-2 items-center mb-4">
            <Image
              src="/large-line.png"
              alt="/"
              width={79}
              height={0.1}
              className="h-[0.8px] text-[#0d0d0d]"
            />
            <p className="text-xs">or continue with</p>
            <Image
              src="/large-line.png"
              alt="/"
              width={79}
              height={0.1}
              className="h-[0.8px] text-[#0d0d0d]"
            />
          </div>

          {/* Social Logins */}

          <div className="flex flex-row justify-center space-x-6 text-white mb-4">
            <button className="btn-icon" onClick={() => socialLogin("google")}>
              <Image
                src="/google-logo.png"
                height={44}
                width={44}
                alt="/"
                className="self-center"
              />
            </button>
            <button className="btn-icon" onClick={() => socialLogin("twitch")}>
              <Image
                src="/twitter-logo.png"
                height={44}
                width={44}
                alt="/"
                className="self-center"
              />
            </button>
            <button className="btn-icon" onClick={() => socialLogin("github")}>
              <Image
                src="/github-logo.png"
                height={44}
                width={44}
                alt="/"
                className="self-center"
              />
            </button>
            <button className="btn-icon" onClick={() => socialLogin("discord")}>
              <FaDiscord className="self-center h-6 w-6" />
            </button>
          </div>

          {/* Or divider */}

          <div className="flex space-x-2 items-center mb-4">
            <Image
              src="/small-line.png"
              alt="/"
              width={123}
              height={0.1}
              className="h-[0.8px] text-[#0d0d0d]"
            />
            <p className="text-xs">or</p>
            <Image
              src="/small-line.png"
              alt="/"
              width={123}
              height={0.1}
              className="h-[0.8px] text-[#0d0d0d]"
            />
          </div>

          {/* Rainbow kit wallet */}

          <div className="btn mb-9">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== "loading";
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === "authenticated");

                return (
                  <div
                    {...(!ready && {
                      "aria-hidden": true,
                      style: {
                        opacity: 0,
                        pointerEvents: "none",
                        userSelect: "none",
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button
                            onClick={openConnectModal}
                            type="button"
                            className="btn text-[#F7F7F7] mb-9"
                          >
                            CONNECT WALLET
                          </button>
                        );
                      }

                      if (chain.unsupported) {
                        return (
                          <button
                            onClick={openChainModal}
                            type="button"
                            className="btn text-[#F7F7F7] mb-9"
                          >
                            Wrong network
                          </button>
                        );
                      }

                      return (
                        <div style={{ display: "flex", gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: "flex", alignItems: "center" }}
                            type="button"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: "hidden",
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <Image
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>

                          <button onClick={openAccountModal} type="button">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ""}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          </div>

          {/* Footer */}

          <footer className="flex flex-row space-x-1 justify-center">
            <h1 className="self-center text-[10px]">Powered by</h1>
            <Image
              src="/arcana-logo-wallet.png"
              alt="/"
              height={10}
              width={13}
              className="object-contain self-center"
            />
            <Image
              src="/arcana-text-wallet.png"
              alt="/"
              height={13}
              width={44}
              className="object-contain self-center"
            />
          </footer>
        </div>
      </Modal>

      {/* Initial chain selector */}

      {/* Login Modal opener */}
      {/*  <div className="mx-auto w-full h-screen flex flex-col justify-center items-start ml-10 space-y-4">
        <button onClick={connectWallet} className="btn">
          Arcana PP
        </button>
        {loggedIn === true ? (
          <div className="flex space-x-2 btn w-auto px-2 justify-center">
            <Image
              src="/arcanaLogo.png"
              alt="/"
              height={20}
              width={20}
              className="flex object-contain"
              quality="100"
            />
            <h1 className="self-center">{address}</h1>
          </div>
        ) : (
          <div className="flex space-x-2 btn">
            <button
              className="flex align-middle justify-center space-x-2 shadow-xl btn"
              onClick={openFirstModal}
            >
              <Image
                src="/arcanaLogo.png"
                alt="/"
                height={20}
                width={20}
                className="flex self-center"
                quality="100"
              />
              <p className="flex self-center">LOGIN</p>
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Login;
