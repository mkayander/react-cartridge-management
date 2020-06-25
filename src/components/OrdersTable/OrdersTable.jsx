import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import MaterialTable from "material-table";
import matTablelocalization from "../../utils/localizations";

import OrderDialog from "./OrderDialog";
import { getStatusOptions, getStatusIcon } from "./orderOptions";
import { NumberParam, useQueryParam } from "use-query-params";

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

    const [orderId, setOrderId] = useQueryParam("orderId", NumberParam);
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
        // setOpenDialog(undefined);
        setOrderId(undefined);
    };

    const handleRowClick = (event, row) => {
        // setOpenDialog(true);
        setOrderId(row.id);
    };

    const getOrderById = function (id) {
        if (data.length > 0 && id) {
            const result = data.find((o) => o.id === id);
            return result ? result : {};
        } else {
            return null;
        }
    };

    return (
        <div>
            <OrderDialog
                open={orderId !== undefined}
                handleRefresh={handleRefresh}
                handleClose={dialogHandleClose}
                order={getOrderById(orderId)}
                statusChoices={statusOptions}
                tableIsLoading={isLoading}
            />
            <MaterialTable
                isLoading={isLoading}
                title="Заказы"
                localization={matTablelocalization}
                onRowClick={handleRowClick}
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
                        editable: "onUpdate",
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
                    actionsCellStyle: {
                        justifyContent: "flex-end",
                    },
                }}
                actions={[
                    (rowData) => ({
                        icon: "check",
                        tooltip:
                            rowData.status !== "work"
                                ? undefined
                                : "Завершить заказ",
                        hidden: rowData.status !== "work",
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
                            resolve();
                        }),
                    onRowUpdate: (newData) =>
                        new Promise((resolve) => {
                            newData.finished =
                                newData.status === "finished" ? true : false;
                            handleUpdate(newData);
                            resolve();
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleDelete(oldData);
                            resolve();
                        }),
                }}
            />
        </div>
    );
}

export default OrdersTable;
