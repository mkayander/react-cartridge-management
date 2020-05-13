import { Container } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import { NavBar, CartridesTable } from "./components";

import React, { Component } from "react";

export class App extends Component {
  state = {
    navbarTitle: "Cartridges",
  };

  render() {
    const { navbarTitle } = this.state;

    return (
      <MuiThemeProvider>
        <NavBar title={navbarTitle} />
        <Container>
          <CartridesTable />
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
