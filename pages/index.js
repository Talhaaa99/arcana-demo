import { useEffect, useState } from "react";
import { getAuth } from "../lib/getAuth";

export default function Home() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [account, setAccount] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [picture, setPicture] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [pKey, setPKey] = useState("");
  const [showKey, setShowkey] = useState(false);

  const auth = getAuth();

  const initialize = async () => {
    await auth.init();
    setIsInitialized(true);
  };

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    const load = async () => {
      if (isInitialized) {
        const loggedIn = await auth.isLoggedIn();
        if (loggedIn) {
          setLoggedIn(true);
          const acc = await getAccountInfo();
          setAccount(acc);
        } else {
          setLoggedIn(false);
        }
      }
    };
  }, [isInitialized]);

  const connectWallet = async () => {
    if (isInitialized) {
      const provider = await auth.connect();
      console.log({ provider });
      await auth.isLoggedIn();
      setLoggedIn(true);
      const acc = await getAccountInfo();
      setAccount(acc);
    }
  };

  const logOut = async () => {
    if (isInitialized) {
      await auth.logout();
      setLoggedIn(false);
    }
  };

  const getAccountInfo = async () => {
    if (isInitialized) {
      const { email, id, name, address, picture } = await auth.getUser();
      setUserInfo(!userInfo);
      setEmail(email);
      setName(name);
      setAddress(address);
      setPicture(picture);
    }
  };
  const getPublicKey = async () => {
    if (isInitialized) {
      const publicKey = await auth.getPublicKey(email);
      setPKey(publicKey);
      setShowkey(!showKey);
    }
  };
  const getArcanaProvider = async () => {
    if (isInitialized) {
      const provider = await auth.provider;
    }
  };
  const signTransaction = async () => {
    const provider = await auth.provider;
    const { sig } = await provider.request({
      method: "eth_signTransaction",
      params: [
        {
          from: address, // sender account address
          gasPrice: 0,
          to: "0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780", // receiver account address
          value: "0x0de0b6b3a7640000",
        },
      ],
    });
    console.log({ sig });
  };
  console.log(account);
  return (
    <div className="mx-auto w-full h-screen flex flex-col justify-center items-start ml-10 space-y-4">
      <div className="flex">
        <button
          className="h-20 w-40 text-xl border-2 rounded-full px-6 py-2 text-white bg-blue-600"
          onClick={getAccountInfo}
        >
          Toggle user info
        </button>
        {userInfo ? (
          <div className="flex ml-2">
            <img className="text-xl text-black" src={picture} alt={name}></img>
            <div className="ml-2">
              <h1 className="text-xl text-black">Name: {name}</h1>
              <h1 className="text-xl text-black">Email: {email}</h1>
              <h1 className="text-xl text-black">Address: {address}</h1>
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="h-20 w-40 text-xl border-2 rounded-full px-6 py-2 text-white bg-blue-600"
          onClick={getPublicKey}
        >
          View key
        </button>
        <h1 className="text-xl font-bold self-center pl-4">
          {pKey !== "" && showKey ? pKey : null}
        </h1>
      </div>
      <br></br>
      <button
        className="h-20 w-40 text-xl border-2 rounded-full px-6 py-2 text-white bg-blue-600"
        onClick={signTransaction}
      >
        Sign Transaction
      </button>
      {loggedIn !== true ? (
        <button
          className="h-20 w-40 text-xl border-2 rounded-full px-6 py-2 text-white bg-blue-600"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="h-20 w-40 text-xl border-2 rounded-full px-6 py-2 text-white bg-blue-600"
          onClick={logOut}
        >
          Disconnect
        </button>
      )}
    </div>
  );
}
