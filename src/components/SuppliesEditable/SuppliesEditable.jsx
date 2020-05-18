import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Paper } from "@material-ui/core";

import tinycolor from "tinycolor2";

import MaterialTable from "material-table";
import localization from "./localization";

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
        data,
        cartridges,
        handleSupplyDelete,
        handleSupplyUpdate,
        handleSupplyCreate,
    } = props;

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

    const columns = [
        { title: "Дата", field: "date", type: "datetime", editable: "never" },
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
    ];

    return (
        <MaterialTable
            isLoading={data.length > 0 ? false : true}
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
            columns={columns}
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
                        resolve();
                    }),
                onRowUpdate: (newData) =>
                    new Promise((resolve) => {
                        handleSupplyUpdate(prepareData(newData));
                        resolve();
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        handleSupplyDelete(oldData.id);
                        resolve();
                    }),
            }}
        />
    );
}

export default SuppliesEditable;
