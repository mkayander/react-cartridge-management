export function getHostname() {
    const { hostname } = window.location;
    const port = hostname === "localhost" ? ":8000" : "";
    return hostname + port;
}

export function getApiUrl() {
    return `http://${getHostname()}/api/`;
}

export function getWsChatUrl() {
    // const { hostname } = window.location;
    return `ws://${getHostname()}/chat`;
}
