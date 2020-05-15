import React, { useState } from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";

import MaterialTable from "material-table";
import localization from "./localization";
import { deleteSupply } from "../../api";

const useStyles = makeStyles((theme) => ({
    outRow: {
        backgroundColor: theme.palette.info.light,
    },
}));

function SuppliesEditable(props) {
    const { data, cartridges, handleSupplyDelete } = props;

    const classes = useStyles();

    let cartridgesChoices = {};
    cartridges.forEach(
        (item) =>
            (cartridgesChoices[item.name] = `${item.manufacturer} ${item.name}`)
    );

    const columns = [
        { title: "Дата", field: "date", type: "datetime" },
        { title: "Выдача", field: "out", type: "boolean" },
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
            localization={localization}
            title="Перемещения Картриджей"
            columns={columns}
            data={props.data}
            options={{
                rowStyle: (rowData) => {
                    console.log("rowStyle: rowData=", rowData);
                    return { backgroundColor: "()" };
                },
            }}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            console.log("onRowAdd:", newData);
                            resolve();
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((reject) => {
                        console.log("onRowUpdate:", newData, oldData);
                        reject();
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                        handleSupplyDelete(oldData.id);
                        resolve();
                    }),
            }}
        />
    );
}

export default SuppliesEditable;
