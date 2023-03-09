import MarketplaceJSON from "../../../src/Marketplace.json";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@arcana/auth-react";
import { useRouter } from "next/router";

export default function NFTPage(props) {
  const auth = useAuth();
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [message, updateMessage] = useState("");
  const [currAddress, updateCurrAddress] = useState("0x");

  const router = useRouter();
  const { tokenId } = router.query;
  console.log("param token id: ", tokenId);

  async function getNFTData() {
    const ethers = require("ethers");

    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(auth.provider);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    let meta = (await axios.get(tokenURI)).data;

    console.log("listed token + metadata", listedToken, meta);

    let item = {
      price: meta.price,
      tokenId: tokenId,
      seller: listedToken.seller,
      owner: listedToken.owner,
      image: meta.image,
      name: meta.name,
      description: meta.description,
    };
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr);
    updateCurrAddress(addr);
  }

  async function buyNFT() {
    try {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      const provider = new ethers.providers.Web3Provider(auth.provider);
      const signer = provider.getSigner();

      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        MarketplaceJSON.address,
        MarketplaceJSON.abi,
        signer
      );
      const salePrice = ethers.utils.parseUnits(data.price, "ether");
      updateMessage("Buying the NFT... Please Wait (Upto 5 mins)");
      //run the executeSale function
      let transaction = await contract.executeSale(tokenId, {
        value: salePrice,
      });
      await transaction.wait();

      alert("You successfully bought the NFT!");
      updateMessage("");
    } catch (e) {
      alert("Upload Error" + e);
    }
  }

  if (!dataFetched) getNFTData(tokenId);

  return (
    <div className="absolute ml-[240px] p-4">
      <div className="flex card space-x-4">
        <Image
          height={400}
          width={400}
          quality={100}
          src={data.image}
          alt=""
          className="w-2/5"
          style={{ objectFit: "contain" }}
        />
        <div className="text-xl space-y-6 z-20 text-slate-200 flex-col max-w-md">
          <p>Name: {data.name}</p>
          <p>Description: {data.description}</p>
          <p>
            Price: <span className="">{data.price + " ETH"}</span>
          </p>
          <p>
            Owner: <span className="text-sm">{data.owner}</span>
          </p>
          <p>
            Seller: <span className="text-sm">{data.seller}</span>
          </p>
          <p>
            {currAddress == data.owner || currAddress == data.seller ? (
              <button
                className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                onClick={() => buyNFT(tokenId)}
              >
                Buy this NFT
              </button>
            ) : (
              <p className="text-emerald-700">You are the owner of this NFT</p>
            )}

            <p className="text-green text-center mt-3">{message}</p>
          </p>
        </div>
      </div>
    </div>
  );
}
