import React, { Component } from "react";

import { Grid, CircularProgress } from "@material-ui/core";

import { withSnackbar } from "notistack";

import { CartridesTable, SuppliesEditable, OrdersTable } from "../components";
import { CommonApi } from "../api/CommonApi";
import fetchAll from "../api";

class Home extends Component {
    state = {
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
    };

    displayActions = {
        success: async (msg) => {
            this.props.enqueueSnackbar(msg, { variant: "success" });
        },
        error: async (msg) => {
            this.props.enqueueSnackbar(`${msg}`, { variant: "error" });
            console.log("dispError:", msg);
        },
        msg: async (msg) => {
            this.props.enqueueSnackbar(msg);
        },
    };

    handleRefresh = async () => {
        fetchAll()
            .catch((reason) => {
                console.log(reason.body);
                this.displayActions.error(reason);
            })
            .then((response) => {
                if (response) {
                    const { cartridges, supplies, orders } = response.data;
                    this.setState({
                        cartridgesData: cartridges,
                        suppliesData: supplies,
                        ordersData: orders,
                    });
                }
            });
    };

    supplyApi = new CommonApi(
        "supplies/",
        {
            create: {
                success: "Перемещение создано успешно!",
                error: "Не удалось создать перемещение!",
            },
            update: {
                success: "Перемещение обновлено успешно!",
                error: "Не удалось обновить перемещение!",
            },
            delete: {
                success: "Перемещение удалено успешно!",
                error: "Не удалось удалить перемещение!",
            },
        },
        {
            refreshAll: this.handleRefresh,
            setState: (value) => this.setState({ suppliesData: value }),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        }
    );

    orderApi = new CommonApi(
        "orders/",
        {
            create: {
                success: "Заказ создан успешно!",
                error: "Не удалось создать заказ!",
            },
            update: {
                success: "Заказ обновлён успешно!",
                error: "Не удалось обновить заказ!",
            },
            delete: {
                success: "Заказ удалён успешно!",
                error: "Не удалось удалить заказ!",
            },
        },
        {
            refreshAll: this.handleRefresh,
            setState: (value) => this.setState({ ordersData: value }),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        }
    );

    async componentDidMount() {
        await this.handleRefresh();
    }

    render() {
        const { cartridgesData, suppliesData, ordersData } = this.state;

        return (
            <Grid container spacing={3}>
                <Grid key="progress" xs={12} item>
                    {/* <LinearProgress variant="indeterminate" color="secondary" /> */}
                    <CircularProgress />
                    <CircularProgress disableShrink />
                </Grid>
                <Grid key="cartridges" xs={12} lg={4} item>
                    <CartridesTable cartridges={cartridgesData} />
                </Grid>
                <Grid key="supplies" xs={12} lg={8} item>
                    <SuppliesEditable
                        data={suppliesData}
                        cartridges={cartridgesData}
                        handleSupplyDelete={this.supplyApi.delete}
                        handleSupplyCreate={this.supplyApi.create}
                        handleSupplyUpdate={this.supplyApi.update}
                    />
                </Grid>
                <Grid key="orders" xs={12} lg={12} item>
                    <OrdersTable
                        data={ordersData}
                        cartridges={cartridgesData}
                        handleCreate={this.orderApi.create}
                        handleUpdate={this.orderApi.update}
                        handleDelete={this.orderApi.delete}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default withSnackbar(Home);
