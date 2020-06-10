import React from "react";

import { Email } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";

function InWorkStatus() {
    return (
        <Tooltip title="Требует Отправки" aria-label="Требует Отправки">
            <Email />
        </Tooltip>
    );
}

export default InWorkStatus;
