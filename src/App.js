import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Container } from "@material-ui/core";
import {
    MuiThemeProvider,
    createMuiTheme,
    responsiveFontSizes,
} from "@material-ui/core/styles";

import { green, blue } from "@material-ui/core/colors";

import "./App.css";

import React, { Component } from "react";

import { NavBar } from "./components";
import { Home } from "./pages/Home";

// import styles from "./App.css";

export class App extends Component {
    state = {
        navbarTitle: "РЦ Валищево • Картриджи",
        theme: responsiveFontSizes(
            createMuiTheme({
                palette: {
                    // type: "dark",
                    primary: blue,
                    secondary: green,
                },
                tables: {
                    borderSize: "0.5rem",
                    elevation: 5,
                },
                // status: {
                //   danger: "orange",
                // },
            })
        ),
    };

    render() {
        const { navbarTitle, theme } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <NavBar title={navbarTitle} />
                <Container style={{ paddingTop: 5 + "%" }} maxWidth="lg">
                    <BrowserRouter>
                        <Switch>
                            <Route path="/" exact component={Home} />
                        </Switch>
                    </BrowserRouter>
                </Container>
            </MuiThemeProvider>
        );
    }
}

export default App;
