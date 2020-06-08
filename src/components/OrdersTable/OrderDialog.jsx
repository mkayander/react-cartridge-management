import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

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

export default function CustomizedDialogs({ open, handleClose, order }) {
    const classes = useStyles();
    console.log("CustomizedDialogs: ", order);
    return (
        <Dialog
            // className={classes.root}
            maxWidth="md"
            fullWidth={true}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}>
            <MuiDialogTitle disableTypography className={classes.title}>
                <Typography variant="h6">Заказ картриджей №10293</Typography>
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
                <Typography gutterBottom>{order.status}</Typography>
                <Typography gutterBottom>Email body</Typography>
                <Typography gutterBottom>Answer</Typography>
            </MuiDialogContent>
            <MuiDialogActions className={classes.actions}>
                <Button autoFocus onClick={handleClose} color="primary">
                    Отправить менеджеру
                </Button>
            </MuiDialogActions>
        </Dialog>
    );
}
