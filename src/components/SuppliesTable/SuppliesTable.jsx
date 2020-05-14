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

export default function SuppliesTable({ supplies }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="cartridges table">
        <TableHead>
          <TableRow>
            <TableCell>Время</TableCell>
            <TableCell align="right">Наименование</TableCell>
            <TableCell align="right">Количество</TableCell>
            <TableCell align="right">Комментарий</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supplies.map((row) => (
            <TableRow key={row.url}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.cartridge_str}</TableCell>
              <TableCell align="right">{row.count}</TableCell>
              <TableCell align="right">{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
