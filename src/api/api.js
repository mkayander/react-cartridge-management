import axios from "axios";

export const api = axios.create({
  baseURL: "http://ps-bykrc.dellin.local/api/",
  responseType: "json",
});
