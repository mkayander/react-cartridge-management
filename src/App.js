import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Container, IconButton } from "@material-ui/core";
import {
    MuiThemeProvider,
    createMuiTheme,
    responsiveFontSizes,
} from "@material-ui/core/styles";
import { Close } from "@material-ui/icons";

import { green, blue } from "@material-ui/core/colors";

import { SnackbarProvider } from "notistack";

import React, { Component } from "react";

import { NavBar } from "./components";

import Test from "./pages/Test";
import Home from "./pages/Home";
import MobileHome from "./pages/MobileHome";
import CustomChat from "./components/Chat/CustomChat";

// import styles from "./App.css";

export class App extends Component {
    state = {
        auth: {
            // authenticated: false,
            full_name: "",
            last_login: "",
            username: "",
        },
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

    notistackRef = React.createRef();
    onClickDismiss = (key) => () => {
        this.notistackRef.current.closeSnackbar(key);
    };

    componentDidMount() {
        // console.log("window.django: ", window.django);
        if (window.django) {
            this.setState({ auth: window.django.user });
        }
    }

    render() {
        const { navbarTitle, theme } = this.state;

        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <SnackbarProvider
                        ref={this.notistackRef}
                        action={(key) => (
                            <IconButton
                                onClick={this.onClickDismiss(key)}
                                color="inherit">
                                <Close />
                            </IconButton>
                        )}>
                        <NavBar
                            title={navbarTitle}
                            username={this.state.auth.username}
                        />
                        <Container
                            style={{ paddingTop: 5 + "%" }}
                            maxWidth="lg">
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/test" exact component={Test} />
                                <Route
                                    path="/mobile"
                                    exact
                                    component={MobileHome}
                                />
                                <Route
                                    path="/Chat"
                                    exact
                                    component={CustomChat}
                                />
                            </Switch>
                        </Container>
                    </SnackbarProvider>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;
