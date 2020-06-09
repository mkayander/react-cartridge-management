import { getOrdersOptions } from "../../api";

export default async function getStatusOptions() {
    console.log("getStatusOptions called.");
    const options = await getOrdersOptions();
    let result = {};
    options.actions.status.choices.forEach((opt) => {
        result[opt.value] = opt.display_name;
    });
    console.log("getStatusOptions: ", result);
    return result;
}
