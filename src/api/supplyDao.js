// import { createSupply, fetchSupplies, updateSupply, deleteSupply } from "./";
import { api } from "./api";

export const supplyDao = {
    getAll: async () => {
        const supplies = await api.get("supplies/");
        console.log("fetchSupplies:", supplies);
        return supplies.data;
    },
    create: async (supply) => {
        api.post(`supplies/`, supply).catch((reason) => {
            console.log("response: ", reason.response.data);
        });
        console.log("createSupply:", supply);
    },
    update: async (supply) => {
        api.put(`supplies/${supply.id}/`, supply);
    },
    delete: async (id) => {
        api.delete(`supplies/${id}/`);
    },
};
