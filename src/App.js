import { Container, Grid } from "@material-ui/core";
import {
    MuiThemeProvider,
    createMuiTheme,
    responsiveFontSizes,
} from "@material-ui/core/styles";

import { green, blue } from "@material-ui/core/colors";

import "./App.css";

import {
    fetchCartridgesList,
    fetchSupplies,
    fetchOrders,
    deleteSupply,
    createSupply,
    updateSupply,
} from "./api";

import React, { Component } from "react";

import {
    NavBar,
    CartridesTable,
    // SuppliesTable,
    SuppliesEditable,
} from "./components";

// import styles from "./App.css";

export class App extends Component {
    state = {
        navbarTitle: "Cartridges",
        theme: responsiveFontSizes(
            createMuiTheme({
                palette: {
                    // type: "dark",
                    primary: blue,
                    secondary: green,
                },
                borderSize: "0.5rem",
                // status: {
                //   danger: "orange",
                // },
            })
        ),
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
    };

    handleRefresh = async () => {
        const cartridges = await fetchCartridgesList();
        const supplies = await fetchSupplies();
        const orders = await fetchOrders();
        this.setState({
            cartridgesData: cartridges,
            suppliesData: supplies,
            ordersData: orders,
        });
    };

    handleSupplyDelete = async (id) => {
        await deleteSupply(id);
        await this.handleRefresh();
        // this.props.enqueueSnackbar(`Перемещение №${id} удалено успешно!`);
    };

    handleSupplyCreate = async (supply) => {
        await createSupply(supply);
        await this.handleRefresh();
        // this.props.enqueueSnackbar(`Перемещение №${id} удалено успешно!`);
    };

    handleSupplyUpdate = async (supply) => {
        await updateSupply(supply);
        await this.handleRefresh();
        // this.props.enqueueSnackbar(`Перемещение №${id} удалено успешно!`);
    };

    async componentDidMount() {
        await this.handleRefresh();
    }

    render() {
        const {
            navbarTitle,
            theme,
            cartridgesData,
            suppliesData,
            // ordersData,
        } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <NavBar title={navbarTitle} />
                <Container style={{ paddingTop: 5 + "%" }} maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid key="cartridges" xs={12} lg={4} item>
                            <CartridesTable cartridges={cartridgesData} />
                        </Grid>
                        <Grid key="supplies" xs={12} lg={8} item>
                            <SuppliesEditable
                                data={suppliesData}
                                cartridges={cartridgesData}
                                handleSupplyDelete={this.handleSupplyDelete}
                                handleSupplyCreate={this.handleSupplyCreate}
                                handleSupplyUpdate={this.handleSupplyUpdate}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </MuiThemeProvider>
        );
    }
}

export default App;
