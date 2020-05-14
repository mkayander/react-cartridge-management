import { api } from "./api";

export const fetchCartridgesList = async () => {
  let cartridges = await api.get("cartridges/");
  console.log("fetchCartridgesList:", cartridges);
  return cartridges.data;
};

export const fetchSupplies = async () => {
  let supplies = await api.get("supplies/");
  console.log("fetchSupplies:", supplies);
  return supplies.data;
};
