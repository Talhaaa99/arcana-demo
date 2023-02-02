import { AuthProvider, CHAIN } from "@arcana/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { chains } from "../atom/contentAtom";

const GetAuth = () => {
  return auth;
};

export default GetAuth;
