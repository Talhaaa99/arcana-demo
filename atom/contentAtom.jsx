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
export const chains = atom({
  key: "chain-select",
  default: CHAIN.POLYGON_MAINNET,
});
export const walletState = atom({
  key: "wallet-state",
  default: true,
});
