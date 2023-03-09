import { AuthProvider, CHAIN } from "@arcana/auth";

let auth;
export function getAuth() {
  return auth;
}

export const initAuth = async () => {
  const appAddress = "4cc8e4d01f02581d9ac0627c8b5aae62e631f5d3";
  const auth = new AuthProvider(`${appAddress}`, {
    position: "right",
    theme: "light",
    alwaysVisible: true,
    chainConfig: {
      chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
      rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    },
    network: "dev",
  });
  await auth.init();
};
