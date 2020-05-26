import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import tinycolor from "tinycolor2";

import MaterialTable from "material-table";
import localization from "../../utils/m-t-localization";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
}));

const prepareData = (supply) => {
    supply.out = supply.out === "true" || supply.out === true ? true : false;
    return supply;
};

function SuppliesEditable(props) {
    const {
        isLoading,
        data,
        cartridges,
        handleSupplyDelete,
        handleSupplyUpdate,
        handleSupplyCreate,
    } = props;

    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const classes = useStyles();
    const theme = useTheme();

    const rowStyles = {
        outRow: {
            backgroundColor: tinycolor(theme.palette.error.light).lighten(20),
        },
        inRow: {
            backgroundColor: tinycolor(theme.palette.success.light).lighten(24),
        },
    };

    let cartridgesChoices = {};
    cartridges.forEach(
        (item) =>
            (cartridgesChoices[item.name] = `${item.manufacturer} ${item.name}`)
    );

    return (
        <MaterialTable
            isLoading={isLoading}
            components={{
                Container: (props) => (
                    <Paper
                        {...props}
                        elevation={theme.tables.elevation}
                        className={classes.root}
                    />
                ),
            }}
            localization={localization}
            title="Перемещение Картриджей"
            columns={[
                {
                    title: "Дата",
                    field: "date",
                    type: "datetime",
                    editable: "never",
                },
                {
                    title: "Событие",
                    field: "out",
                    initialEditValue: "true",
                    lookup: { true: "Выдача", false: "Поступление" },
                },
                {
                    title: "Картридж",
                    field: "cartridge",
                    lookup: cartridgesChoices,
                },
                { title: "Количество", field: "count", type: "numeric" },
                { title: "Комментарий", field: "comment" },
            ]}
            data={data}
            options={{
                exportButton: true,
                actionsColumnIndex: -1,
                // emptyRowsWhenPaging: true,
                // paging: false,
                rowStyle: (rowData) =>
                    rowData.out ? rowStyles.outRow : rowStyles.inRow,
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        handleSupplyCreate(prepareData(newData));
                        // enqueueSnackbar("Перемещение добавлено");
                        resolve();
                    }),
                onRowUpdate: (newData) =>
                    new Promise((resolve) => {
                        handleSupplyUpdate(prepareData(newData));
                        // enqueueSnackbar("Перемещение обновлено");
                        resolve();
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleSupplyDelete(oldData);
                        // enqueueSnackbar("Перемещение удалено");
                        resolve();
                    }),
            }}
        />
    );
}

export default SuppliesEditable;
