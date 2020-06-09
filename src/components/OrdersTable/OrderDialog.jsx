import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { getEmail } from "../../api";
import {
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    // root: {
    //     minWidth: "80%",
    // },
    title: {
        margin: 0,
        padding: theme.spacing(2),
    },
    content: {
        padding: theme.spacing(2),
    },
    actions: {
        margin: 0,
        padding: theme.spacing(1),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

export default function OrderDialog({ open, handleClose, order }) {
    const classes = useStyles();
    const [email, setEmail] = useState({});
    useEffect(() => {
        console.log("OrderDialog: useEffect: ", order.email);
        if (order.email) {
            getEmail(order.email)
                .then((response) => {
                    console.log(response);
                    setEmail(response.data);
                })
                .catch((reason) => console.error(reason));
        }
        // return () => {
        //     cleanup
        // }
    }, [order.email]);

    return (
        <Dialog
            // className={classes.root}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <MuiDialogTitle disableTypography className={classes.title}>
                <Typography variant="h6">
                    Заказ картриджей от {new Date(order.date).toLocaleString()}
                </Typography>
                {handleClose ? (
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
            <MuiDialogContent dividers className={classes.content}>
                <TableContainer>
                    <Table>
                        {/* <TableHead>

                        </TableHead> */}
                        <TableBody>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography>Статус заказа:</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography>{order.status}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography>Тело письма:</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: email.html,
                                        }}></div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </MuiDialogContent>
            <MuiDialogActions className={classes.actions}>
                <Button autoFocus onClick={handleClose} color="primary">
                    Отправить менеджеру
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}
