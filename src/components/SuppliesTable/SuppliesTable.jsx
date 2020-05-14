import React from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
}))(TableCell);

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

const useStyles = makeStyles((theme) => ({
  outRow: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.common.white,
  },
  inRow: {
    backgroundColor: theme.palette.success.light,
  },
}));

export default function SuppliesTable(props) {
  const classes = useStyles();
  const { supplies } = props;
  const eleveation = props.elevation ? props.elevation : 5;

  return (
    <TableContainer component={Paper} elevation={eleveation}>
      <Table aria-label="cartridges table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Время</StyledTableCell>
            <StyledTableCell align="right">Наименование</StyledTableCell>
            <StyledTableCell align="right">Количество</StyledTableCell>
            <StyledTableCell align="right">Комментарий</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supplies.map((row) => (
            <TableRow
              key={row.id}
              className={row.out ? classes.outRow : classes.inRow}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.cartridge_str}</TableCell>
              <TableCell align="right">
                {row.out ? row.count * -1 : row.count}
              </TableCell>
              <TableCell align="right">{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
