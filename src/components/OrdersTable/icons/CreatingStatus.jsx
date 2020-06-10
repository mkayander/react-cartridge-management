import React from "react";

import { Email } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function InWorkStatus({ title }) {
    return (
        <Tooltip title={title ? title : ""} aria-label={title}>
            <Email />
        </Tooltip>
    );
}

export default InWorkStatus;
