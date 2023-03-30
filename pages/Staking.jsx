import { useEffect, useState } from "react";

import { ethers } from "ethers";

import artifact from "../artifacts/contracts/Staking.sol/Staking.json";
import linkArtifact from "../artifacts/contracts/Chainlink.sol/Chainlink.json";
import usdtArtifact from "../artifacts/contracts/Tether.sol/Tether.json";
import usdcArtifact from "../artifacts/contracts/UsdCoin.sol/UsdCoin.json";
import wbtcArtifact from "../artifacts/contracts/WrappedBitcoin.sol/WrappedBitcoin.json";
import wethArtifact from "../artifacts/contracts/WrappedEther.sol/WrappedEther.json";
import StakeModal from "../components/StakeModal";
import Image from "next/image";
import { useAuth } from "@arcana/auth-react";

const CONTRACT_ADDRESS = "0x2BDa51DaDD637637ef96ED66BB9096b0e09b721E";
const LINK_ADDRESS = "0xAB41eFBEC15717694e97F87C160B49cBD3424A07";
const USDT_ADDRESS = "0x469Bfc748EEdc98DC604428D4156D09Cd5067850";
const USDC_ADDRESS = "0x2bab4377cb23CD0bb9A31952288C6C7e685d90F7";
const WBTC_ADDRESS = "0xd73c80B484c8ECaBA883962e9Eb4C209d1aa23eD";
const WETH_ADDRESS = "0xc2E89119A7E59E7c05306b5DCc63cA974ecA9E37";

const Staking = () => {
  const [provider, setProvider] = useState(undefined);

  const [signer, setSigner] = useState(undefined);

  const [contract, setContract] = useState(undefined);

  const toEther = (wei) =>
    Number(ethers.utils.formatEther(String(wei))).toFixed(2);

  const [tokenSymbols, setTokenSymbols] = useState([]);

  const [tokens, setTokens] = useState({});

  const [stakedTokens, setStakedTokens] = useState({});

  const [assetIds, setAssetIds] = useState([]);
  const [assets, setAssets] = useState([]);

  const [showStakeModal, setShowStakeModal] = useState(false);

  const [stakeTokenSymbol, setStakeTokenSymbol] = useState(undefined);

  const [stakeTokenQuantity, setStakeTokenQuantity] = useState(undefined);

  const [tokenContracts, setTokenContracts] = useState({});

  const auth = useAuth();

  const arcanaProvider = auth.provider;

  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(arcanaProvider);
      setProvider(provider);

      const contract = await new ethers.Contract(
        CONTRACT_ADDRESS,
        artifact.abi,
        provider
      );
      setContract(contract);

      const linkContract = await new ethers.Contract(
        LINK_ADDRESS,
        linkArtifact.abi,
        provider
      );
      const usdtContract = await new ethers.Contract(
        USDT_ADDRESS,
        usdtArtifact.abi,
        provider
      );
      const usdcContract = await new ethers.Contract(
        USDC_ADDRESS,
        usdcArtifact.abi,
        provider
      );
      const wbtcContract = await new ethers.Contract(
        WBTC_ADDRESS,
        wbtcArtifact.abi,
        provider
      );
      const wethContract = await new ethers.Contract(
        WETH_ADDRESS,
        wethArtifact.abi,
        provider
      );
      setTokenContracts((prev) => ({ ...prev, ["LINK"]: linkContract }));
      setTokenContracts((prev) => ({ ...prev, ["USDT"]: usdtContract }));
      setTokenContracts((prev) => ({ ...prev, ["USDC"]: usdcContract }));
      setTokenContracts((prev) => ({ ...prev, ["WBTC"]: wbtcContract }));
      setTokenContracts((prev) => ({ ...prev, ["WETH"]: wethContract }));

      const tokenSymbols = await contract.getTokenSymbols();
      setTokenSymbols(tokenSymbols);

      tokenSymbols.map(async (symbol) => {
        const token = await contract.getToken(symbol);
        setTokens((prev) => ({ ...prev, [symbol]: token }));

        const stakedAmount = await contract.stakedTokens(symbol);
        setStakedTokens((prev) => ({
          ...prev,
          [symbol]: toEther(stakedAmount),
        }));
      });
    };
    onLoad();
  }, []);

  const isConnected = () => signer !== undefined;

  const getSigner = async () => {
    const signer = provider.getSigner();
    setSigner(signer);
    return signer;
  };

  const connectAndLoad = async () => {
    const signer = await getSigner(provider);
    setSigner(signer);

    const assetIdsHex = await contract.connect(signer).getTokenIdsForAddress();
    const assetIds = assetIdsHex.map((id) => Number(id));
    setAssetIds(assetIds);

    const queriedAssets = await Promise.all(
      assetIds.map((id) => contract.connect(signer).getPositionById(Number(id)))
    );

    queriedAssets.map(async (asset) => {
      const tokensStaked = toEther(asset.tokenQuantity);

      const ethAccruedInterestWei = await calcAccruedInterest(
        asset.apy,
        asset.ethValue,
        asset.createdDate
      );

      const ethAccruedInterest = toEther(ethAccruedInterestWei);

      const usdAccruedInterest = (
        (ethAccruedInterest * tokens["WETH"].usdPrice) /
        100
      ).toFixed(2);

      const parsedAsset = {
        positionId: Number(asset.positionId),
        tokenName: asset.name,
        tokenSymbol: asset.symbol,
        createdDate: asset.createdDate,
        apy: asset.apy / 100,
        tokensStaked: tokensStaked,
        usdValue: toEther(asset.usdValue) / 100,
        usdAccruedInterest: usdAccruedInterest,
        ethAccruedInterest: ethAccruedInterest,
        open: asset.open,
      };

      setAssets((prev) => [...prev, parsedAsset]);
    });
  };

  const calcAccruedInterest = async (apy, value, createdDate) => {
    const numberOfDays = await contract.calculateNumberDays(createdDate);
    const accruedInterest = await contract.calculateInterest(
      apy,
      value,
      numberOfDays
    );
    return Number(accruedInterest);
  };

  const openStakingModal = (tokenSymbol) => {
    setShowStakeModal(true);
    setStakeTokenSymbol(tokenSymbol);
  };

  const stakeTokens = async () => {
    const stakeTokenQuantityWei = ethers.utils.parseEther(stakeTokenQuantity);
    await tokenContracts[stakeTokenSymbol]
      .connect(signer)
      .approve(contract.address, stakeTokenQuantityWei);
    contract
      .connect(signer)
      .stakeTokens(stakeTokenSymbol, stakeTokenQuantityWei);
  };

  const withdraw = (positionId) => {
    contract.connect(signer).closePosition(positionId);
  };

  const tokenRow = (tokenSymbol) => {
    const token = tokens[tokenSymbol];
    const amountStaked = Number(stakedTokens[tokenSymbol]);

    return (
      <div className="flex flex-row text-slate-300 space-x-2">
        <div className="">{displayLogo(token?.symbol)}</div>
        <div className="">{token?.symbol}</div>
        <div className="">{(Number(token?.usdPrice) / 100).toFixed(0)}</div>
        <div className="">{amountStaked}</div>
        <div className="col-md-2">{(Number(token?.apy) / 100).toFixed(0)}%</div>
        <div className="col-md-2">
          {isConnected() && (
            <div
              className="stake"
              onClick={() => openStakingModal(tokenSymbol, "12%")}
            >
              Stake
            </div>
          )}
        </div>
      </div>
    );
  };

  const displayLogo = (symbol) => {
    if (symbol === "LINK") {
      return (
        <>
          <Image
            alt="/"
            height={20}
            width={20}
            className="rounded-full"
            src="/chainlink.jpeg"
          />
        </>
      );
    } else if (symbol === "USDT") {
      return (
        <>
          <Image
            alt="/"
            height={20}
            width={20}
            className="logoImg"
            src="/usdt.png"
          />
        </>
      );
    } else if (symbol === "USDC") {
      return (
        <>
          <Image
            alt="/"
            height={20}
            width={20}
            className="logoImg"
            src="/usdc.png"
          />
        </>
      );
    } else if (symbol === "WBTC") {
      return (
        <>
          <Image
            alt="/"
            height={20}
            width={20}
            className="logoImg"
            src="/wbtc.png"
          />
        </>
      );
    } else if (symbol === "WETH") {
      return (
        <>
          <Image
            alt="/"
            height={20}
            width={20}
            className="logoImg"
            src="/weth.png"
          />
        </>
      );
    }
  };

  return (
    <div className="absolute ml-[300px] mt-[100px] text-slate-200 card w-[700px] h-700px justify-center">
      <div className="p-10">
        <div className="subContainer">
          <span>
            <Image
              alt="/"
              height={20}
              width={20}
              className="rounded-full"
              src="/weth.png"
            />
          </span>
          <span className="text-lg self-center">Ethereum Market</span>
        </div>

        <div>
          <div className="flex flex-row space-x-2">
            <div className="col-md-2">Asset</div>
            <div className="col-md-2">Symbol</div>
            <div className="col-md-2">Price (USD)</div>
            <div className="col-md-2">Total Supplied</div>
            <div className="col-md-2">APY</div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <div className="flex flex-col">
          {tokenSymbols.length > 0 &&
            Object.keys(tokens).length > 0 &&
            tokenSymbols.map((a, idx) => <div key={idx}>{tokenRow(a)}</div>)}
        </div>
      </div>

      <div className="assetContainer">
        {isConnected() ? (
          <>
            <div className="subContainer">
              <span className="marketHeader stakedTokensHeader">
                Staked Assets
              </span>
            </div>
            <div>
              <div>
                <div className="flex flex-row ">
                  <div className="col-md-1">Asset</div>
                  <div className="col-md-2">Tokens Staked</div>
                  <div className="col-md-2">Market Value (USD)</div>
                  <div className="col-md-2">Accrued Interest (USD)</div>
                  <div className="col-md-2">Accrued Interest (ETH)</div>
                  <div className="col-md-2"></div>
                </div>
              </div>
              <br />
              {assets.length > 0 &&
                assets.map((a, idx) => (
                  <div key={idx} className="flex flex-row space-x-5">
                    <div className="col-md-1">{displayLogo(a.tokenSymbol)}</div>
                    <div className="col-md-2">{a.tokensStaked}</div>
                    <div className="col-md-2">{a.usdValue}</div>
                    <div className="col-md-2">{a.usdAccruedInterest}</div>
                    <div className="col-md-2">{a.ethAccruedInterest}</div>
                    <div className="col-md-2">
                      {a.open ? (
                        <button
                          onClick={() => withdraw(a.positionId)}
                          className="stake"
                        >
                          Withdraw
                        </button>
                      ) : (
                        <span>closed</span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div onClick={() => connectAndLoad()} className="connectButton">
            Connect Wallet
          </div>
        )}
      </div>
      {showStakeModal && (
        <StakeModal
          onClose={() => setShowStakeModal(false)}
          stakeTokenSymbol={stakeTokenSymbol}
          setStakeTokenQuantity={setStakeTokenQuantity}
          stakeTokens={stakeTokens}
        />
      )}
    </div>
  );
};

export default Staking;
