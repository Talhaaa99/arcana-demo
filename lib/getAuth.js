import { AuthProvider, CHAIN } from "@arcana/auth";

const appAddress = "08C6D517Bdeb1Ea606B11352F19273a4b2C8D346";

const auth = new AuthProvider(`08C6D517Bdeb1Ea606B11352F19273a4b2C8D346`, {
  position: "right", // defaults to right
  theme: "dark", // defaults to dark
  alwaysVisible: true, // defaults to true which is Full UI mode
  chainConfig: {
    chainId: CHAIN.POLYGON_MAINNET,
    rpcUrl: "https://polygon-rpc.com/",
  },
});

export function getAuth() {
  return auth;
}
