import axios from "axios";

export const BASE_URL = "https://api-moments.poap-email.com/";

const JWT_SESSION_STORAGE_KEY = 'JWT_SESSION_STORAGE_KEY';

// @ts-ignore
const api = axios.create({
  baseURL: BASE_URL,
});

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

async function createPost({address, description, eventId, file}: {description:string; address:string; eventId: number; file: Blob }) {
  const formData = new FormData();
  formData.append('address', address);
  formData.append('eventId', eventId.toString());
  formData.append('description', description);
  formData.append('file', file);
  const bearer = 'Bearer ' + sessionStorage.getItem(JWT_SESSION_STORAGE_KEY)
  return await api.post('posts',formData, {headers: {"Content-Type": "multipart/form-data", "Authorization": bearer}});
}

async function vote({ address, post_id }: { address: string; post_id: number; }) {
  return await api.post("reaction", {
    address: address,
    post_id: post_id
  })
}

async function getEvent({eventId}: {eventId: number}) {
  const response = await api.get(`events/${eventId}`);
  return await response.data;
}

async function getPostsByEventId({eventId}: {eventId: any}) {
  const response = await api.get(`posts/event/${eventId}`);
  return await response.data;
}

export {
  loginWallet,
  getEns,
  vote,
  scan,
  createPost,
  getEvent,
  getPostsByEventId,
};
