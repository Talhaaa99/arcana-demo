import { ConnectButton, openConnectModal } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { getAuth } from "../lib/getAuth";
import { CHAIN } from "@arcana/auth";
import truncateEthAddress from "truncate-eth-address";
import Image from "next/image";
import { Modal } from "@mui/material";
import {
  FaGoogle,
  FaGithub,
  FaTwitch,
  FaDiscord,
  FaLine,
} from "react-icons/fa";

const LoginMethods = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [pKey, setPKey] = useState("");
  const [showKey, setShowkey] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  const auth = getAuth();

  const initialize = async () => {
    await auth.init();
    setIsInitialized(true);
  };

  useEffect(() => {
    initialize();
    setHooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
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
  }, [isInitialized]);

  const connectWallet = async () => {
    if (isInitialized) {
      const provider = await auth.connect();
      console.log({ provider });
      await auth.isLoggedIn();
      setLoggedIn(true);
      const acc = await getAccountInfo();
      setAccount(acc);
    }
  };

  const logOut = async () => {
    if (isInitialized) {
      await auth.logout();
      setLoggedIn(false);
    }
  };

  const getAccountInfo = async () => {
    if (isInitialized) {
      const { email, id, name, address, picture } = await auth.getUser();
      setUserInfo(!userInfo);
      setEmail(email);
      setName(name);
      setAddress(address);
      setPicture(picture);
    }
  };
  const getPublicKey = async () => {
    if (isInitialized) {
      const publicKey = await auth.getPublicKey(email);
      setPKey(publicKey);
      setShowkey(!showKey);
    }
  };

  // demo app functions

  const socialLogin = async (socialAuth) => {
    if (isInitialized) {
      const social = await auth.loginWithSocial(socialAuth);
      await auth.isLoggedIn();
      setLoggedIn(true);
      const acc = await getAccountInfo();
      setAccount(acc);
      return social;
    }
  };
  console.log("accountinfo", address);

  const emailLogin = async (emailAuth) => {
    if (isInitialized) {
      return await auth.loginWithLink(emailAuth);
    }
  };
  const getAccounts = async () => {
    if (isInitialized) {
      return await auth.provider.request({ method: "eth_accounts" });
    }
  };
  const isLoggedIn = async () => {
    if (isInitialized) {
      const loggedIn = await auth.isLoggedIn();
      return loggedIn;
    }
  };
  console.log(loggedIn);

  const handleEmailLogin = async (e) => {
    setEmailInput(e.target.value);
  };

  function setHooks() {
    const provider = auth.provider;
    provider.on("connect", async (params) => {
      console.log({ type: "connect", params: params });
      const isLoggedIn = await auth.isLoggedIn();
      console.log({ isLoggedIn });
    });
    provider.on("accountsChanged", (params) => {
      //Handle
      console.log({ type: "accountsChanged", params: params });
    });
    provider.on("chainChanged", async (params) => {
      console.log({ type: "chainChanged", params: params });
    });
  }
  console.log(address);

  const openFirstModal = async () => {
    setFirstModal(true);
  };

  const closeFirstModal = async () => {
    setFirstModal(false);
  };
  const openSecondModal = async () => {
    setSecondModal(true);
  };
  const closeSecondModal = async () => {
    setSecondModal(false);
  };

  return (
    <div className="w-full relative h-full">
      <Modal
        open={firstModal}
        onClose={closeFirstModal}
        className="border-2 border-red-400 w-[332px] h-[572px] bg-[#F9F9F9] m-auto rounded-xl"
        hideBackdrop={true}
      >
        <div className="p-6 flex flex-col h-full justify-center rounded-2xl">
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
      <div className="mx-auto w-full h-screen flex flex-col justify-center items-start ml-10 space-y-4">
        {loggedIn ? (
          <div className="flex space-x-2 btn w-[200px]">
            <Image
              src="/arcanaLogo.png"
              alt="/"
              height={20}
              width={20}
              className="flex object-contain"
              quality="100"
            />
            <h1>{truncateEthAddress(address)}</h1>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              className="flex align-middle space-x-2 shadow-xl btn"
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
              <h1 className="flex self-center">LOGIN</h1>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginMethods;
