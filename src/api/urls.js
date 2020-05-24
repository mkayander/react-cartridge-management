const localAddresses = ["localhost", "127.0.0.1"];

export function getHostname() {
    const { hostname } = window.location;
    const port = localAddresses.includes(hostname) ? ":8000" : "";
    return hostname + port;
}

export function getApiUrl() {
    return `http://${getHostname()}/api/`;
}

export function getWsChatUrl() {
    // const { hostname } = window.location;
    return `ws://${getHostname()}/chat`;
}
