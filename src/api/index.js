import api from "./api";

export function fetchAll() {
    return api.get("all");
}

export function getEmail(emailId) {
    return api.get(`emails/${emailId}/`);
}

export function getOrdersOptions() {
    return api.options("orders/");
}

export function getServiceOptions() {
    return api.options("service/");
}

export function sendOrderEmail(orderId, options = {}) {
    return api.post(`action/send-order/${orderId}`, options);
}

export function fetchCartridges() {
    return api.get("cartridges/");
}
