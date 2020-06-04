import axios from "axios";
import Cookies from "js-cookie";
import { getApiUrl } from "./urls";

// const apiUrl = getApiUrl();
// console.log(apiUrl);

const api = axios.create({
    // baseURL: "http://it-vlshv.dellin.local/api/",
    // baseURL: "http://" + window.location.host + "/api/",
    baseURL: getApiUrl(),
    responseType: "json",
});
api.interceptors.request.use((config) => {
    config.headers["X-CSRFToken"] = Cookies.get("csrftoken");
    // console.log("api.interceptors.request: ", config.headers);
    return config;
});

export default api;
