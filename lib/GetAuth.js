import { AuthProvider, CHAIN } from "@arcana/auth";

function getAuth() {
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
  return auth;
}

export default getAuth;
