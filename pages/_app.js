import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { atom, RecoilRoot } from "recoil";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { AuthProvider, CHAIN } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

export default function App({ Component, pageProps }) {
  const { chains, provider } = configureChains(
    [mainnet, polygon, optimism, arbitrum],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  const clientId = "4cc8e4d01f02581d9ac0627c8b5aae62e631f5d3";
  const arcanaProvider = new AuthProvider(`${clientId}`, {
    position: "right",
    theme: "light",
    alwaysVisible: true,
    chainConfig: {
      chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
      rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    },
    network: "dev",
  });
  arcanaProvider.init();

  return (
    <RecoilRoot>
      <ProvideAuth provider={arcanaProvider}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <div className="bg-[#1E1E1E] w-full h-full overflow-x-hidden overflow-y-hidden flex flex-col">
              <Sidebar />
              <Component {...pageProps} />
              <Footer />
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </ProvideAuth>
    </RecoilRoot>
  );
}
