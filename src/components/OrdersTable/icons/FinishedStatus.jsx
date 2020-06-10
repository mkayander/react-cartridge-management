import React from "react";

import { CheckCircle } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function FinishedStatus({ title }) {
    return (
        <Tooltip title={title ? title : ""} aria-label={title}>
            <CheckCircle color="secondary" />
        </Tooltip>
    );
}

export default FinishedStatus;
