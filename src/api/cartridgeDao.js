import { api } from "./api";

export const cartridgeDao = {
    getAll: async () => {
        const response = await api.get("cartridges/");
        return response.data;
    },
    // create: async (order) => {
    //     api.post(`orders/`, order).catch((reason) => {
    //         console.log("ordersDao: ", reason.response.data);
    //     });
    //     console.log("ordersDao.create:", order);
    // },
    // update: async (order) => {
    //     api.put(`orders/${order.id}/`, order);
    // },
    // delete: async (id) => {
    //     api.delete(`orders/${id}/`);
    // },
};
