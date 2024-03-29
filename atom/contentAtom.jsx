import { atom } from "recoil";
import { CHAIN } from "@arcana/auth";

export const contentState = atom({
  key: "content-state",
  default: "token",
});
export const loginState = atom({
  key: "login-state",
  default: [],
});
export const initialChains = atom({
  key: "chain-select",
  default: CHAIN.POLYGON_MUMBAI_TESTNET,
});
export const walletState = atom({
  key: "wallet-state",
  default: true,
});
export const chainId = atom({
  key: "chainId-state",
  default: "0xa4b1",
});
export const chainName = atom({
  key: "chainName-state",
  default: "Arbitrum One",
});
export const rpcUrl = atom({
  key: "rpcUrl-state",
  default: "https://arb1.arbitrum.io/rpc ",
});
export const blockUrl = atom({
  key: "blockUrl-state",
  default: "https://arbiscan.io/",
});
export const name = atom({
  key: "name-state",
  default: "Arbitrum",
});
export const symbol = atom({
  key: "symbol-state",
  default: "ETH",
});
export const ArcanaAuth = atom({
  key: "arcana-auth",
  default: [],
});
export const loginContent = atom({
  key: "login-content",
  default: {
    plugPlay: false,
    emailLI: false,
    googleLI: false,
    twitterLI: false,
    githubLI: false,
    discordLI: false,
    rainbowLI: false,
  },
});

export const chainContent = atom({
  key: "chain-content",
  default: {
    selectChain: false,
    customChain: false,
    switchChain: false,
  },
});
