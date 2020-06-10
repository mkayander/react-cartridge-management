import React from "react";

import { Schedule } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function FinishedStatus({ title }) {
    return (
        <Tooltip title={title ? title : ""} aria-label={title}>
            <Schedule />
        </Tooltip>
    );
}

export default FinishedStatus;
