import React, { Component } from "react";
import { AppBar, Toolbar } from "@material-ui/core";

export class NavBar extends Component {
  render() {
    const { title } = this.props;

    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
