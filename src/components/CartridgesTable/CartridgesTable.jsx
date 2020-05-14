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

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}));

function CartridgesTable(props) {
  const classes = useStyles();
  const { cartridges } = props;
  const eleveation = props.elevation ? props.elevation : 5;

  return (
    <TableContainer component={Paper} elevation={eleveation}>
      <Table aria-label="cartridges table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Производитель</TableCell>
            <TableCell className={classes.header} align="right">
              Наименование
            </TableCell>
            <TableCell className={classes.header} align="right">
              Количество
            </TableCell>
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
