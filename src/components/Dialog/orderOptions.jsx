import { getOrdersOptions } from "../../api";
import {
    FinishedStatus,
    InWorkStatus,
    PendingStatus,
    CreatingStatus,
} from "../OrdersTable/icons";
import React from "react";

export async function getStatusOptions() {
    console.log("getStatusOptions called.");
    const options = await getOrdersOptions();
    let result = {};
    // console.log("getStatusOptions: ", options);
    options.data.actions.POST.status.choices.forEach((opt) => {
        result[opt.value] = opt.display_name;
    });
    // console.log("getStatusOptions: ", result);
    return result;
}

export function getStatusIcon(statusId, options) {
    switch (statusId) {
        case "finished":
            return <FinishedStatus title={options[statusId]} />;
        case "work":
            return <InWorkStatus title={options[statusId]} />;
        case "pending":
            return <PendingStatus title={options[statusId]} />;
        default:
            return <CreatingStatus title={options[statusId]} />;
    }
}
