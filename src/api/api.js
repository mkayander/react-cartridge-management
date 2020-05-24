import axios from "axios";
import { getApiUrl } from "./urls";

const apiUrl = getApiUrl();
console.log(apiUrl);

export const api = axios.create({
    // baseURL: "http://it-vlshv.dellin.local/api/",
    // baseURL: "http://" + window.location.host + "/api/",
    baseURL: getApiUrl(),
    responseType: "json",
});
