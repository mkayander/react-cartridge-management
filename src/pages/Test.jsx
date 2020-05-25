import React from "react";

import styles from "./Test.module.scss";

function Test() {
    return (
        <div>
            <h1>Test page</h1>
            <hr />
            <hr className="hr-text" data-content="TEST TEST test" />
        </div>
    );
}

export default Test;
