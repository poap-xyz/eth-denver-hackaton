import axios from "axios";

export const BASE_URL = process.env.API_URL ? process.env.API_URL : "https://api.nonconformistducks.com/";

// @ts-ignore
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
})

async function getSignature() {
  const res = await api.get("account/token/")
  return res.data.token;
}

async function loginWallet(message: string, address: string) {
  const res = await api.post("account/token/", {
    "signature": message,
    "address": address
  });
  return res.data.access;
}

async function vote({ address, post_id }: { address: string; post_id: number; }) {
  return await api.post("reaction", {
    address: address,
    post_id: post_id
  })
}

export {
  getSignature,
  loginWallet
};
