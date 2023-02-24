import { AuthProvider, CHAIN } from "@arcana/auth";
import { useRecoilValue } from "recoil";
import { initialChains } from "../atom/contentAtom";

const GetAuth = () => {
  const chain = useRecoilValue(initialChains);
  const appAddress = "bad424ac9d22202f07a742efaa36c865260d28f2";
  const auth = new AuthProvider(`${appAddress}`, {
    position: "right", // defaults to right
    theme: "light", // defaults to dark
    alwaysVisible: true, // defaults to true which is Full UI mode
    chainConfig: {
      chainId: chain,
      rpcUrl: "https://polygon-rpc.com",
    },
  });
  return auth;
};

export default GetAuth;
