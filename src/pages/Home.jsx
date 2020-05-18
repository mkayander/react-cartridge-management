import React, { Component } from "react";

import { Grid } from "@material-ui/core";

import { CartridesTable, SuppliesEditable, OrdersTable } from "../components";
import { ordersDao } from "../api/orderDao";
import { supplyDao } from "../api/supplyDao";
import { cartridgeDao } from "../api/cartridgeDao";

export class Home extends Component {
    state = {
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
    };

    handleRefresh = async () => {
        const cartridges = await cartridgeDao.getAll();
        const supplies = await supplyDao.getAll();
        // const supplies = await fetchSupplies();
        const orders = await ordersDao.getAll();
        this.setState({
            cartridgesData: cartridges,
            suppliesData: supplies,
            ordersData: orders,
        });
    };

    handleSupplyDelete = async (id) => {
        await supplyDao.delete(id);
        await this.handleRefresh();
        // this.props.enqueueSnackbar(`Перемещение №${id} удалено успешно!`);
    };

    handleSupplyCreate = async (supply) => {
        await supplyDao.create(supply);
        // await createSupply(supply);
        await this.handleRefresh();
        // this.props.enqueueSnackbar(`Перемещение №${id} удалено успешно!`);
    };

    handleSupplyUpdate = async (supply) => {
        await supplyDao.update(supply);
        await this.handleRefresh();
        // this.props.enqueueSnackbar(`Перемещение №${id} удалено успешно!`);
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
