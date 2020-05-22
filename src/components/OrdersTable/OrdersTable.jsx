import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";
// import { DoneAll, CheckCircle, LocalShipping } from "@material-ui/icons";

import MaterialTable from "material-table";
import localization from "../SuppliesEditable/localization";
import FinishedStatus from "./FinishedStatus";
import InWorkStatus from "./InWorkStatus";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
}));

function OrdersTable({
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
            isLoading={data.length > 0 ? false : true}
            title="Заказы"
            localization={localization}
            columns={[
                {
                    title: "Статус",
                    field: "finished",
                    // editable: "onUpdate",
                    initialEditValue: "false",
                    lookup: {
                        true: "Завершён",
                        false: "В работе",
                    },
                    render: (rowData) =>
                        rowData.finished ? (
                            <FinishedStatus />
                        ) : (
                            <InWorkStatus />
                        ),
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
                    tooltip: rowData.finished ? undefined : "Завершить заказ",
                    disabled: rowData.finished,
                    onClick: (event, rowData) => {
                        console.log(event, rowData);
                        if (!rowData.finished) {
                            alert(`Заказ ${rowData.number} выполнен`);
                        } else {
                            alert(
                                `Заказ ${rowData.number} уже является выполненным`
                            );
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
