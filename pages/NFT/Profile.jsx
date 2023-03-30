import { useParams } from "react-router-dom";
import MarketplaceJSON from "../../src/Marketplace.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "../../components/NFTTile";

import { useAuth } from "@arcana/auth-react";
import truncateEthAddress from "truncate-eth-address";

export default function Profile() {
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);
  const [address, updateAddress] = useState("0x");
  const [totalPrice, updateTotalPrice] = useState("0");
  const auth = useAuth();

  async function getNFTData(tokenId) {
    const ethers = require("ethers");
    let sumPrice = 0;
    //After adding your Hardhat network to your metamask, this code will get providers and signers

    const provider = new ethers.providers.Web3Provider(auth.provider);
    const signer = provider.getSigner();
    const accounts = await auth.provider.request({
      method: "eth_requestAccounts",
    });
    const addr = accounts[0];
    console.log("Accounts: ", accounts);

    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );

    //create an NFT Token
    let transaction = await contract.getMyNFTs();

    /*
     * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
     * and creates an object of information that is to be displayed
     */

    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        sumPrice += Number(price);
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
    updateAddress(addr);
    updateTotalPrice(sumPrice.toPrecision(3));
  }

  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className="absolute ml-[240px] max-w-4xl p-4">
      <div className="min-w-[1109px] p-10 h-5/6 m-auto mt-20 relative rounded-2xl shadow-xl bg-white">
        <div className="flex text-center flex-col mt-11 md:text-2xl text-white">
          <div className="mb-5">
            <p className="font-bold text-purple-500">Wallet Address</p>
            <p>{truncateEthAddress(address)}</p>
          </div>
        </div>
        <div className="flex flex-row text-center justify-center mt-10 md:text-xl text-white">
          <div>
            <p className="font-bold text-purple-500">No. of NFTs</p>
            <p>{data.length}</p>
          </div>
          <div className="ml-20">
            <p className="font-bold text-purple-500">Total Value</p>
            <p>{totalPrice} ETH</p>
          </div>
        </div>
        <div className="flex flex-col text-center items-center mt-11 text-white">
          <p className="font-bold text-purple-500">Your NFTs</p>
          <div className="flex justify-center space-x-2 flex-wrap max-w-screen">
            {data.map((value, index) => {
              return <NFTTile data={value} key={index}></NFTTile>;
            })}
          </div>
          <div className="mt-10 text-xl">
            {data.length == 0
              ? "Oops, No NFT data to display (Are you logged in?)"
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
