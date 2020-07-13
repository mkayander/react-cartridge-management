import React from "react";
import {makeStyles, useTheme} from "@material-ui/core/styles";

import {Paper} from "@material-ui/core";

import MaterialTable from "material-table";
import matTablelocalization from "../../utils/localizations";

import OrderDialog from "../Dialog/OrderDialog";
import {getStatusOptions, getStatusIcon} from "../Dialog/orderOptions";
import {NumberParam, useQueryParam} from "use-query-params";
import {getPrintersOptions} from "./serviceOptions";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
}));

function ServiceTable({
                          isLoading,
                          data,
                          handleRefresh,
                          handleCreate,
                          handleUpdate,
                          handleDelete,
                      }) {
    const classes = useStyles();

    const [serviceId, setServiceId] = useQueryParam("serviceId", NumberParam);
    const [statusOptions, setStatusOptions] = React.useState({
        finished: "Завершён",
        work: "В работе",
        pending: "Обработка заказа",
    });

    const [printerOptions, setPrinterOptions] = React.useState({
        /*HP_M227fdn: "HP LaserJet Pro MFP M227fdn",
        HP_M426fdn: "HP LaserJet Pro MFP M426fdn",
        Kyocera_FS1030MFP: "Kyocera FS-1030MFP",
        Kyocera_FS1035MFP: "Kyocera FS-1035MFP"*/
    });

    React.useEffect(() => {
        getStatusOptions()
            .then((result) => {
                setStatusOptions(result);
            })
            .catch((reason) => console.error(reason));
    }, []);

    React.useEffect(() => {
        getPrintersOptions()
            .then((result) => {
                setPrinterOptions(result);
            })
            .catch((reason) => console.error(reason));
    }, []);

    const handleRowClick = (event, row) => {
        // setOpenDialog(true);
        setServiceId(row.id);
    };

    const dialogHandleClose = () => {
        // setOpenDialog(undefined);
        setServiceId(undefined);
    };

    const getServiceById = function (id) {
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
                open={serviceId !== undefined}
                handleRefresh={handleRefresh}
                handleClose={dialogHandleClose}
                order={getServiceById(serviceId)}
                statusChoices={statusOptions}
                tableIsLoading={isLoading}
            />
            <MaterialTable
                isLoading={isLoading}
                title="Ремонт принтеров"
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
                        title: "Принтер",
                        field: "printer",
                        type: "string",
                        lookup: printerOptions,
                    },
                    {
                        title: "Инвентарный номер",
                        field: "inv_number",
                        type: "string",
                        emptyValue: "Не определён",
                    },
                    {
                        title: "Причина неисправности",
                        field: "defect_description",
                        type: "string",
                        emptyValue: "",
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

export default ServiceTable;
