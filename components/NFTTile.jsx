import Image from "next/image";
import Link from "next/link";

function NFTTile({ data }) {
  console.log("Data is", data);
  const newTo = {
    pathname: "/NFT/NFTPage/" + data.tokenId,
  };

  console.log("token is ", data?.tokenId);
  return (
    <Link href={newTo}>
      <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
        <Image
          height={100}
          width={72}
          src={data.image}
          alt=""
          className="w-72 h-80 rounded-lg object-cover"
        />
        <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
          <strong className="text-xl">{data.name}</strong>
          <p className="display-inline">{data.description}</p>
        </div>
      </div>
    </Link>
  );
}

export default NFTTile;
