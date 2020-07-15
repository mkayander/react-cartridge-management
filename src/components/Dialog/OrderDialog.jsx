import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { getEmail, sendOrderEmail } from "../../api";

import {
    Button,
    Dialog,
    IconButton,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    LinearProgress,
    Checkbox,
    FormControlLabel,
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
    open, // Boolean open state
    handleClose, // Function to set "open" value to false
    // handleRefresh, // Function to refresh order data
    order, // Order data object to be displayed in this dialog
    statusChoices, // Available choices for the status icon
    tableIsLoading, // Boolean that indicates if the parent table is in loading state
}) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [takeOld, setTakeOld] = useState(false);

    // Hook that runs each time "order" data is changed
    useEffect(() => {
        if (order) {
            setTakeOld(order.take_old_away);
            if (order.email) {
                setIsLoading(true);
                getEmail(order.email)
                    .then((response) => {
                        setEmail(response.data);
                    })
                    .catch((reason) => console.error(reason))
                    .finally(() => setIsLoading(false));
            } else {
                setEmail(undefined);
            }
        }
    }, [order]);

    const handleEmailSend = () => {
        setIsLoading(true);
        let tmp;
        if (order.cartridge) tmp = "c" + order.id;
        else tmp = "s" + order.id;
        sendOrderEmail(tmp, { take_old_away: takeOld })
            .then((value) => {
                console.log(value);
                handleClose();
                // handleRefresh();
            })
            .catch((reason) => console.error(reason))
            .finally(() => setIsLoading(false));
    };

    const handleCheckbox = (event) => {
        setTakeOld(event.target.checked);
    };

    return order ? (
        <Dialog
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <MuiDialogTitle disableTypography className={classes.title}>
                <Typography variant="h5">
                    Заказ картриджей от {new Date(order.date).toLocaleString()}
                </Typography>
                {isLoading || tableIsLoading ? <LinearProgress /> : null}
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
                                    {!isLoading ? (
                                        <Typography>
                                            {order.email_is_sent && email
                                                ? new Date(
                                                      email.processed
                                                  ).toLocaleString()
                                                : "Письмо ещё не отправлено!"}
                                        </Typography>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                            {order.cartridge ? (
                                <TableRow>
                                    <TableCell align="left">
                                        <Typography variant="subtitle1">
                                            Опции:
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={takeOld}
                                                    disabled={
                                                        order.email_is_sent
                                                    }
                                                    onChange={handleCheckbox}
                                                />
                                            }
                                            label="Забрать старые картриджи"
                                        />
                                    </TableCell>
                                </TableRow>
                            ) : undefined}
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
                    disabled={order.status !== "creating"}
                    onClick={() => handleEmailSend()}
                    color="primary">
                    Отправить менеджеру
                </Button>
            </MuiDialogActions>
        </Dialog>
    ) : null;
}
