import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
} from "@material-ui/core";
import { Http, SupervisedUserCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    // button: {
    //     marginRight: theme.spacing(2),
    // },
}));

function NavBar({ title }) {
    const classes = useStyles();

    const history = useHistory();

    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="regular">
                    <Typography
                        className={classes.title}
                        variant="h6"
                        color="inherit">
                        {title}
                    </Typography>
                    <Tooltip title="REST API" arrow>
                        <IconButton
                            onClick={() => {
                                history.push("/api");
                                window.location.reload();
                            }}
                            color="inherit"
                            aria-label="REST">
                            <Http fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Админка" arrow>
                        <IconButton
                            onClick={() => {
                                history.push("/admin");
                                window.location.reload();
                            }}
                            color="inherit"
                            aria-label="Admin">
                            <SupervisedUserCircle fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    {/* <Button color="inherit">
                        <Tooltip title="REST API">
                            <Http />
                        </Tooltip>
                    </Button> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;
