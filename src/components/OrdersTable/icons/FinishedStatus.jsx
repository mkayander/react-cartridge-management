import React from "react";

import { CheckCircle } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function FinishedStatus() {
    return (
        <Tooltip title="Завершён" aria-label="Завершён">
            <CheckCircle color="secondary" />
        </Tooltip>
    );
}

export default FinishedStatus;
