import React, { Component } from "react";

import { Grid } from "@material-ui/core";

import { withSnackbar } from "notistack";

import { CartridesTable, SuppliesEditable, OrdersTable } from "../components";
import { ordersDao } from "../api/orderDao";
import { supplyDao } from "../api/supplyDao";
import { cartridgeDao } from "../api/cartridgeDao";

class Home extends Component {
    state = {
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
    };

    dispError = (msg) => {
        this.props.enqueueSnackbar(msg, { variant: "error" });
        console.log("dispError:", msg);
    };

    dispSuccess = (msg) => {
        this.props.enqueueSnackbar(msg, { variant: "success" });
    };

    dispMsg = (msg) => {
        this.props.enqueueSnackbar(msg);
    };

    handleRefresh = () => {
        cartridgeDao
            .getAll()
            .catch((reason) => this.dispError(reason))
            .then((value) => this.setState({ cartridgesData: value }));

        supplyDao
            .getAll()
            .catch((reason) => this.dispError(reason))
            .then((value) => this.setState({ suppliesData: value }));

        // const supplies = await fetchSupplies();
        ordersDao
            .getAll()
            .catch((reason) => this.dispError(reason))
            .then((value) => this.setState({ ordersData: value }));

        // this.setState({
        //     cartridgesData: cartridges,
        //     suppliesData: supplies,
        //     ordersData: orders,
        // });
    };

    handleSupplyDelete = (id) => {
        supplyDao
            .delete(id)
            .catch((reason) => {
                this.dispError("Не удалось выполнить удаление: \n" + reason);
            })
            .then(() => {
                this.handleRefresh();
                this.dispSuccess(`Перемещение №${id} удалено успешно!`);
            });
    };

    handleSupplyCreate = (supply) => {
        supplyDao
            .create(supply)
            .catch((reason) => this.dispError(reason))
            .then((value) => {
                console.log("handleSupplyCreate.then:", value);
                this.handleRefresh();
                this.dispSuccess(`Перемещение создано успешно!`);
            });
        // await createSupply(supply);
        // await this.handleRefresh();
    };

    handleSupplyUpdate = (supply) => {
        supplyDao
            .update(supply)
            .catch((reason) =>
                this.dispError("Не удалось выполнить удаление: \n" + reason)
            )
            .then((value) => {
                this.handleRefresh();
                this.dispSuccess(
                    `Перемещение №${supply.id} обновлено успешно!`
                );
            });
    };

    async componentDidMount() {
        await this.handleRefresh();
    }

    render() {
        const { cartridgesData, suppliesData, ordersData } = this.state;

        return (
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
                <Grid key="orders" xs={12} lg={12} item>
                    <OrdersTable
                        data={ordersData}
                        cartridges={cartridgesData}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withSnackbar(Home);
