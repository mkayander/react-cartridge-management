import React, { Component } from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";

export class CartridgesTable extends Component {
  state = {};

  render() {
    const { cartridges } = this.props;

    return (
      <TableContainer component={Paper}>
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
}

export default CartridgesTable;
