import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";
// import { DoneAll, CheckCircle, LocalShipping } from "@material-ui/icons";

import MaterialTable from "material-table";
import FinishedStatus from "./icons/FinishedStatus";
import InWorkStatus from "./icons/InWorkStatus";
import PendingStatus from "./icons/PendingStatus";
import matTablelocalization from "../../utils/localizations";

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
    handleCreate,
    handleUpdate,
    handleDelete,
}) {
    const classes = useStyles();

    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    let cartridgesChoices = {};
    cartridges.forEach(
        (item) =>
            (cartridgesChoices[item.name] = `${item.manufacturer} ${item.name}`)
    );

    return (
        <MaterialTable
            isLoading={isLoading}
            title="Заказы"
            localization={matTablelocalization}
            columns={[
                {
                    title: "Статус",
                    field: "status",
                    editable: "onUpdate",
                    // editable: "never",
                    initialEditValue: "pending",
                    lookup: {
                        finished: "Завершён",
                        work: "В работе",
                        pending: "Обработка заказа",
                    },
                    render: (rowData) => {
                        switch (rowData.status) {
                            case "finished":
                                return <FinishedStatus />;
                            case "work":
                                return <InWorkStatus />;
                            default:
                                return <PendingStatus />;
                        }
                    },
                },
                {
                    title: "Дата создания",
                    field: "date",
                    type: "datetime",
                    editable: "never",
                },
                {
                    title: "Дата завершения",
                    field: "date_finished",
                    type: "datetime",
                    editable: "never",
                    emptyValue: "—",
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
                        console.log(event, rowData);
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
    );
}

export default OrdersTable;
