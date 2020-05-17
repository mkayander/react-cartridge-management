import React from "react";

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        borderTop: theme.tables.borderSize,
        borderTopColor: theme.palette.primary.light,
        borderTopStyle: "solid",
    },
    header: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.common.white,
    },
}));

function CartridgesTable(props) {
    const classes = useStyles();
    const { cartridges } = props;

    return (
        <TableContainer
            className={classes.root}
            component={Paper}
            elevation={useTheme().tables.elevation}>
            <Table aria-label="cartridges table">
                <TableHead>
                    <TableRow>
                        <TableCell>Производитель</TableCell>
                        <TableCell align="right">Наименование</TableCell>
                        <TableCell align="right">Количество</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartridges.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.manufacturer}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CartridgesTable;
