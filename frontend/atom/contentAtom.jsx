import { atom } from "recoil";
import { CHAIN } from "@arcana/auth";

export const contentState = atom({
  key: "content-state",
  default: "login",
});
export const loginState = atom({
  key: "login-state",
  default: [],
});
export const initialChains = atom({
  key: "chain-select",
  default: CHAIN.POLYGON_MAINNET,
});
export const walletState = atom({
  key: "wallet-state",
  default: true,
});
export const chainId = atom({
  key: "chainId-state",
  default: "0x1",
});
export const chainName = atom({
  key: "chainName-state",
  default: "Eth Mainnet Ankr",
});
export const rpcUrl = atom({
  key: "rpcUrl-state",
  default: "https://rpc.ankr.com/eth",
});
