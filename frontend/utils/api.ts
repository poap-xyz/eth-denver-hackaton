import axios from "axios";

export const BASE_URL = process.env.API_URL ? process.env.API_URL : "http://localhost:3000";

// @ts-ignore
const api = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true
})

async function loginWallet(message: string, address: string, signature: string) {
  const res = await api.post("accounts/login", {
    "signature": signature,
    "address": address,
    "message": message,
  });
  return res.data.access_token;
}

async function getEns(addr:string) {
  return await axios.get(`https://api.poap.xyz/actions/ens/${addr}`)
}

async function scan(addr:string) {
  return await axios.get(`https://api.poap.xyz/actions/scan/${addr}`)
}

async function vote({ address, post_id }: { address: string; post_id: number; }) {
  return await api.post("reaction", {
    address: address,
    post_id: post_id
  })
}

export {
  loginWallet,
  getEns,
  vote,
  scan
};
