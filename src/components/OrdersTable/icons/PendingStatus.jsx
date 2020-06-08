import React from "react";

import { Schedule } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function FinishedStatus() {
    return (
        <Tooltip title="Обрабатывается" aria-label="Обрабатывается">
            <Schedule />
        </Tooltip>
    );
}

export default FinishedStatus;
