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

export function sendOrderEmail(orderId, options = {}) {
    return api.post(`action/send-order/${orderId}`, options);
}

// export const fetchCartridgesList = async () => {
//     const cartridges = await api.get("cartridges/");
//     // console.log("fetchCartridgesList:", cartridges);
//     // return cartridges.data;
//     return (await api.get("cartridges/")).data;
// };

// export const fetchOrders = async () => {
//     const orders = await api.get("orders/");
//     // console.log("fetchSupplies:", orders);
//     return orders.data;
// };
