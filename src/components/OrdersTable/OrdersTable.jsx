import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import MaterialTable from "material-table";
import matTablelocalization from "../../utils/localizations";

import OrderDialog from "./OrderDialog";
import { getStatusOptions, getStatusIcon } from "./orderOptions";
import { sendOrderEmail } from "../../api";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
}));

function OrdersTable({
    isLoading,
    data,
    cartridges,
    handleRefresh,
    handleCreate,
    handleUpdate,
    handleDelete,
}) {
    const classes = useStyles();

    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({});
    const [statusOptions, setStatusOptions] = React.useState({
        finished: "Завершён",
        work: "В работе",
        pending: "Обработка заказа",
    });

    React.useEffect(() => {
        getStatusOptions()
            .then((result) => {
                setStatusOptions(result);
            })
            .catch((reason) => console.error(reason));
    }, []);

    let cartridgesChoices = {};
    cartridges.forEach(
        (item) =>
            (cartridgesChoices[item.name] = `${item.manufacturer} ${item.name}`)
    );

    const dialogHandleClose = () => {
        setOpenDialog(false);
    };

    // const dialogHandleSendEmail = (orderId) => {
    //     sendOrderEmail(orderId)
    //         .then((value) => {
    //             console.log(value);
    //             dialogHandleClose();
    //             handleRefresh();
    //         })
    //         .catch((reason) => console.error(reason));
    // };

    return (
        <div>
            <OrderDialog
                open={openDialog}
                handleRefresh={handleRefresh}
                handleClose={dialogHandleClose}
                // handleSendEmail={dialogHandleSendEmail}
                order={dialogData}
                statusChoices={statusOptions}
                tableIsLoading={isLoading}
            />
            <MaterialTable
                isLoading={isLoading}
                title="Заказы"
                localization={matTablelocalization}
                onRowClick={(event, row) => {
                    setDialogData(row);
                    setOpenDialog(true);
                }}
                columns={[
                    {
                        title: "#",
                        field: "id",
                        editable: "never",
                        hidden: true,
                        searchable: true,
                    },
                    {
                        title: "Статус",
                        field: "status",
                        editable: "onUpdate",
                        // editable: "never",
                        // initialEditValue: "creating",
                        lookup: statusOptions,
                        render: (rowData) => {
                            return rowData
                                ? getStatusIcon(rowData.status, statusOptions)
                                : null;
                        },
                    },
                    {
                        title: "Дата создания",
                        field: "date",
                        type: "datetime",
                        editable: "never",
                        searchable: false,
                    },
                    {
                        title: "Дата завершения",
                        field: "date_finished",
                        type: "datetime",
                        editable: "never",
                        emptyValue: "—",
                        searchable: false,
                    },
                    {
                        title: "Номер",
                        field: "number",
                        type: "numeric",
                        emptyValue: "Не определён",
                    },
                    {
                        title: "Картридж",
                        field: "cartridge",
                        lookup: cartridgesChoices,
                    },
                    {
                        title: "Количество",
                        field: "count",
                        type: "numeric",
                    },
                ]}
                data={data}
                components={{
                    Container: (props) => (
                        <Paper
                            {...props}
                            elevation={useTheme().tables.elevation}
                            className={classes.root}
                        />
                    ),
                }}
                options={{
                    exportButton: true,
                    actionsColumnIndex: -1,
                }}
                actions={[
                    (rowData) => ({
                        icon: "check",
                        tooltip:
                            rowData.status !== "work"
                                ? undefined
                                : "Завершить заказ",
                        disabled: rowData.status !== "work",
                        onClick: (event, rowData) => {
                            if (!rowData.finished) {
                                rowData.finished = true;
                                rowData.status = "finished";
                                handleUpdate(rowData);
                            }
                        },
                    }),
                ]}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleCreate(newData);
                            // enqueueSnackbar("Заказ добавлен");
                            resolve();
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            newData.finished =
                                newData.status === "finished" ? true : false;
                            handleUpdate(newData);
                            // enqueueSnackbar("Заказ обновлён");
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleDelete(oldData);
                            // enqueueSnackbar("Заказ удалён");
                            resolve();
                        }),
                }}
            />
        </div>
    );
}

export default OrdersTable;
