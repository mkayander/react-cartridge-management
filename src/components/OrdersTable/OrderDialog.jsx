import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { getEmail, sendOrderEmail } from "../../api";

// import { isEmpty } from "lodash";

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
    // CircularProgress,
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
    open,
    handleClose,
    // handleSendEmail,
    handleRefresh,
    order,
    statusChoices,
    tableIsLoading,
}) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState();
    const [takeOld, setTakeOld] = useState(false);
    useEffect(() => {
        // console.log("OrderDialog: useEffect: ", order.email);
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
    }, [order.email]);

    const handleEmailSend = () => {
        setIsLoading(true);
        sendOrderEmail(order.id, { take_old_away: takeOld })
            .then((value) => {
                console.log(value);
                handleClose();
                handleRefresh();
            })
            .catch((reason) => console.error(reason))
            .finally(() => setIsLoading(false));
    };

    const handleCheckbox = (event) => {
        setTakeOld(event.target.checked);
    };

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
                                                onChange={handleCheckbox}
                                            />
                                        }
                                        label="Забрать старые картриджи"
                                    />
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
                    disabled={order.status !== "creating"}
                    onClick={() => handleEmailSend()}
                    color="primary">
                    Отправить менеджеру
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}
