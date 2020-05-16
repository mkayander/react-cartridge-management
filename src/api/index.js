import { api } from "./api";

export const fetchCartridgesList = async () => {
    const cartridges = await api.get("cartridges/");
    console.log("fetchCartridgesList:", cartridges);
    // return cartridges.data;
    return (await api.get("cartridges/")).data;
};

export const fetchSupplies = async () => {
    const supplies = await api.get("supplies/");
    console.log("fetchSupplies:", supplies);
    return supplies.data;
};

export const fetchOrders = async () => {
    const orders = await api.get("orders/");
    console.log("fetchSupplies:", orders);
    return orders.data;
};

export const deleteSupply = async (id) => {
    api.delete(`supplies/${id}/`);
};

export const updateSupply = async (supply) => {
    api.put(`supplies/${supply.id}/`, supply);
};

export const createSupply = async (supply) => {
    api.post(`supplies/`, supply).catch((reason) => {
        console.log("response: ", reason.response.data);
    });
    console.log("createSupply:", supply);
};
