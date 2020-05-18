import React from "react";

import { LocalShipping } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function InWorkStatus() {
    return (
        <Tooltip title="В работе" aria-label="В работе">
            <LocalShipping />
        </Tooltip>
    );
}

export default InWorkStatus;
