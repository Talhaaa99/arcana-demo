import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { atom, RecoilRoot } from "recoil";
import Footer from "../components/Footer";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

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

  return (
    <div>
      <RecoilRoot>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains}>
            <div className="bg-[#1E1E1E] w-full h-full overflow-x-hidden overflow-y-hidden flex flex-col">
              <Sidebar />
              <Component {...pageProps} />
              <Footer />
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </RecoilRoot>
    </div>
  );
}
