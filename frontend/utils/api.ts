import axios from "axios";

export const BASE_URL = process.env.API_URL ? process.env.API_URL : "http://localhost:8080";

const JWT_SESSION_STORAGE_KEY = 'JWT_SESSION_STORAGE_KEY';

// @ts-ignore
const api = axios.create({
  baseURL: BASE_URL,
})

async function secureFetch(input: RequestInfo, init?: RequestInit) {
  const bearer = 'Bearer ' + sessionStorage.getItem(JWT_SESSION_STORAGE_KEY)

  const reqOptions = {
    ...init,
    headers: { 'Authorization': bearer, ...(init && init.headers),},
  }

  const res = await fetch(input, reqOptions)

  if (!res.ok) {
    const data = await res.clone().json()
    // New endpoint - Identify errors by code instead of message
    if (data && data.error_code) throw new Error(data.error_code)
    // Legacy endpoint (retro-compatiblity) - Return error messages
    if (data && !data.error_code && data.message) throw new Error(data.message)
    if (data && !data.error_code && data.error) throw new Error(data.error)
    throw new Error(`Request Failed => statusCode: ${res.status} msg: ${res.statusText}`)
  }
  return await res.json()
}

async function loginWallet(message: string, address: string, signature: string) {
  const res = await api.post("accounts/login", {
    "signature": signature,
    "address": address,
    "message": message,
  });
   if(!res || !res.data || !res.data.access_token) {
     throw new Error(`Request Failed => statusCode: ${res.status} msg: ${res.data.message}`)
   }

  sessionStorage.setItem(JWT_SESSION_STORAGE_KEY, res.data.access_token);

}

async function getEns(addr:string) {
  return await axios.get(`https://api.poap.xyz/actions/ens/${addr}`)
}

async function scan(addr:string) {
  return await axios.get(`https://api.poap.xyz/actions/scan/${addr}`)
}

async function createPost({address, description,eventId, file}: {description:string; address:string; eventId: number; file: Blob }) {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('eventId', eventId.toString());
  formData.append('description', description);
  formData.append('file', file);
  return await api.post('posts',formData, {headers: {"Content-Type": "multipart/form-data"}});
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
  scan,
  createPost
};
