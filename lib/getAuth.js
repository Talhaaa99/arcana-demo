import { AuthProvider, CHAIN } from "@arcana/auth";
import { useRecoilState } from "recoil";
import { chains } from "../atom/contentAtom";

const appAddress = "bad424ac9d22202f07a742efaa36c865260d28f2";

const auth = new AuthProvider(`${appAddress}`, {
  position: "right", // defaults to right
  theme: "dark", // defaults to dark
  alwaysVisible: true, // defaults to true which is Full UI mode
  chainConfig: {
    chainId: CHAIN.POLYGON_MAINNET,
    rpcUrl: "https://polygon-rpc.com/",
  },
});
const GetAuth = () => {
  return auth;
};

export default GetAuth;
