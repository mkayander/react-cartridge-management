import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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
import Test from "./pages/Test";

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
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <NavBar title={navbarTitle} />
                    <Container style={{ paddingTop: 5 + "%" }} maxWidth="lg">
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/test" exact component={Test} />
                            {/* <Route
                                path="/admin"
                                render={() => {
                                    window.location.reload();
                                }}
                            />
                            <Route
                                path="/api"
                                render={() => {
                                    window.location.reload();
                                }}
                            /> */}
                            {/* <Route path="/admin" exact component={() => { window.location = 'https://example.zendesk.com/hc/en-us/articles/123456789-Privacy-Policies'; return null;}} /> */}
                        </Switch>
                    </Container>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
