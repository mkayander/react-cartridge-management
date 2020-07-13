import React from "react";
import {getServiceOptions} from "../../api";

export async function getPrintersOptions() {
    console.log("getStatusOptions called.");
    const options = await getServiceOptions();
    let result = {};
    console.log("getStatusOptions: ", options);
    options.data.actions.POST.printer.choices.forEach((opt) => {
        result[opt.value] = opt.display_name;
    });
    // console.log("getStatusOptions: ", result);
    return result;
}