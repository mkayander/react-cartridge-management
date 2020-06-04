// const localAddresses = ["localhost", "127.0.0.1"];
const productionPorts = ["", "80", "443"];

export function getHostname() {
    const { hostname } = window.location;
    const port = productionPorts.includes(window.location.port) ? "" : ":80";
    return hostname + port;
}

export function getApiUrl() {
    return `http://${getHostname()}/api/`;
}

export function getWsChatUrl() {
    return `ws://${getHostname()}/chat`;
}
