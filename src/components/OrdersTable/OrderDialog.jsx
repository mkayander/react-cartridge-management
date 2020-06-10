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

// import { isEmpty } from "lodash";

import {
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    // CircularProgress,
    LinearProgress,
} from "@material-ui/core";
import { getStatusIcon } from "./orderOptions";

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

export default function OrderDialog({
    open,
    handleClose,
    handleSendEmail,
    order,
    statusChoices,
}) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    useEffect(() => {
        console.log("OrderDialog: useEffect: ", order.email);
        if (order.email) {
            setIsLoading(true);
            getEmail(order.email)
                .then((response) => {
                    console.log(response);
                    setEmail(response.data);
                })
                .catch((reason) => console.error(reason))
                .finally(() => setIsLoading(false));
        } else {
            setEmail(undefined);
        }
        // return () => {
        //     cleanup
        // }
    }, [order.email]);

    // const handleEmailSend = () => {
    //     sendOrderEmail(order.id);
    // };

    return (
        <Dialog
            // className={classes.root}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <MuiDialogTitle disableTypography className={classes.title}>
                <Typography variant="h5">
                    Заказ картриджей от {new Date(order.date).toLocaleString()}
                </Typography>
                {isLoading ? <LinearProgress /> : null}
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
                                    <Typography variant="subtitle1">
                                        Статус заказа:
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    {/* <Typography>
                                        {statusChoices[order.status]}
                                    </Typography> */}
                                    {getStatusIcon(order.status, statusChoices)}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography variant="subtitle1">
                                        Дата отправки письма:
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography>
                                        {order.email_is_sent && email
                                            ? new Date(
                                                  email.processed
                                              ).toLocaleString()
                                            : "Письмо ещё не отправлено!"}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography variant="subtitle1">
                                        Тело письма:
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: order.html_message,
                                        }}></div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="left">
                                    <Typography variant="subtitle1">
                                        Ответ:
                                    </Typography>
                                </TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </MuiDialogContent>
            <MuiDialogActions className={classes.actions}>
                <Button
                    autoFocus
                    onClick={() => handleSendEmail(order.id)}
                    color="primary">
                    Отправить менеджеру
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}
