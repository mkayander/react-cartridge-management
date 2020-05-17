import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import MaterialTable from "material-table";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
}));

function OrdersTable({ data, cartridges }) {
    const classes = useStyles();

    let cartridgesChoices = {};
    cartridges.forEach(
        (item) =>
            (cartridgesChoices[item.name] = `${item.manufacturer} ${item.name}`)
    );

    return (
        <MaterialTable
            title="Заказы"
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
                {
                    icon: "check",
                    tooltip: "Выполнить заказ",
                    onClick: (event, rowData) => {
                        console.log(event, rowData);
                        alert(`Заказ ${rowData.number} выполнен`);
                    },
                },
            ]}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        console.log(newData);
                        resolve();
                    }),
                onRowUpdate: (newData) =>
                    new Promise((resolve) => {
                        console.log(newData);
                        resolve();
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        console.log(oldData);
                        resolve();
                    }),
            }}
        />
    );
}

export default OrdersTable;
