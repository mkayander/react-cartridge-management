// const localAddresses = ["localhost", "127.0.0.1"];
const productionPorts = ["80", "443"];

export function getHostname() {
    const { hostname } = window.location;
    console.log(window.location);
    // const port = localAddresses.includes(hostname) ? ":8000" : "";
    const port = productionPorts.includes(window.location.port) ? "" : ":8000";
    return hostname + port;
}

export function getApiUrl() {
    return `http://${getHostname()}/api/`;
}

export function getWsChatUrl() {
    // const { hostname } = window.location;
    return `ws://${getHostname()}/chat`;
}
