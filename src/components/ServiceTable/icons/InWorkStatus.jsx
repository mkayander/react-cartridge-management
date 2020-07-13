import React from "react";

import { LocalShipping } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function InWorkStatus({ title }) {
    return (
        <Tooltip title={title} aria-label={title}>
            <LocalShipping />
        </Tooltip>
    );
}

export default InWorkStatus;
