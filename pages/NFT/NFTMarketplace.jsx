import NFTTile from "../../components/NFTTile";
import Marketplace from "../../src/Marketplace.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "@arcana/auth-react";

export default function NFTMarketplace() {
  const auth = useAuth();

  /* const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmdhoL9K8my2vi3fej97foiqGmJ389SMs55oC5EdkrxF2M",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmTsRJX7r5gyubjkdmzFrKQhHv74p5wT9LdeF1m3RTqrE5",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
  ]; */
  const [data, updateData] = useState([]);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    auth.isLoggedIn;
    const arcanaProvider = auth.provider;
    const provider = new ethers.providers.Web3Provider(arcanaProvider);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    const marketplaceContract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );
    //create an NFT Token
    const transaction = await marketplaceContract.getAllNFTs();
    console.log("Transaction data:", transaction);

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
        console.log("Token URI is ", tokenURI);
        const meta = (await axios.get(tokenURI)).data;
        console.log("meta data", meta);

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
        return item;
      })
    );

    updateData(items);
    updateFetched(true);
  }

  console.log("Data from marketplace", data);
  if (!dataFetched) {
    getAllNFTs();
  }

  return (
    <div className="absolute z-20 ml-[240px] mt-20 h-auto p-4 max-w-5xl flex">
      <div className="max-w-[1109px] p-10 max-h-5/6 m-auto relative rounded-2xl shadow-xl bg-white overflow-y-auto">
        <div className="grid mt-5 space-y-w justify-between grid-cols-5 min-w-auto text-center ">
          {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
        {/*   <button onClick={getAllNFTs} className="btn">
          Fetch NFTs
        </button> */}
      </div>
    </div>
  );
}
