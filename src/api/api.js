import axios from "axios";

export const api = axios.create({
    // baseURL: "http://ps-bykrc.dellin.local/api/",
    baseURL: "http://127.0.0.1:8000/api/",
    responseType: "json",
});
