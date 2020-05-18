import React, { Component } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Tooltip,
} from "@material-ui/core";
import { Http } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";

// const styles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
// }));

export class NavBar extends Component {
    render() {
        const { title, classes } = this.props;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="regular">
                        <Typography variant="h6" color="inherit">
                            {title}
                        </Typography>
                        {/* <IconButton edge="end" color="inherit" aria-label="REST">
                        <Http />
                    </IconButton> */}
                        <Button color="inherit">
                            <Tooltip title="REST API">
                                <Http />
                            </Tooltip>
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default NavBar;
