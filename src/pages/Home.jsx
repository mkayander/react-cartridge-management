import React, { Component } from "react";

import { Grid } from "@material-ui/core";

import { withSnackbar } from "notistack";

import {
    CartridesTable,
    SuppliesEditable,
    OrdersTable,
    Chat,
} from "../components";
import { CommonApi } from "../api/CommonApi";
import fetchAll from "../api";

class Home extends Component {
    state = {
        loading: false,
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
        chatMessageHistory: [],
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
        this.setState({ loading: true });
        console.log("handleRefresh");
        fetchAll()
            .catch((error) => {
                console.log(error.response);
                console.log(error, error.response.data);
                this.displayActions.error(error);
            })
            .then((response) => {
                if (response) {
                    const {
                        cartridges,
                        supplies,
                        orders,
                        chatMessage,
                    } = response.data;
                    this.setState({
                        cartridgesData: cartridges,
                        suppliesData: supplies,
                        ordersData: orders,
                        chatMessageHistory: chatMessage,
                    });
                }
            })
            .finally(() => this.setState({ loading: false }));
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
            // setState: (value) => this.setState({ suppliesData: value }),
            setLoading: (bool) => this.setState({ loading: bool }),
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
            setLoading: (bool) => this.setState({ loading: bool }),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        }
    );

    async componentDidMount() {
        await this.handleRefresh();
    }

    render() {
        const {
            // chatMessageHistory,
            loading,
            cartridgesData,
            suppliesData,
            ordersData,
        } = this.state;

        return (
            <Grid container spacing={3}>
                {/* <Grid key="progress" xs={12} item>
                    <CircularProgress />
                    <CircularProgress disableShrink />
                </Grid> */}
                <Grid key="cartridges" xs={12} lg={4} item>
                    <CartridesTable cartridges={cartridgesData} />
                </Grid>
                <Grid key="supplies" xs={12} lg={8} item>
                    <SuppliesEditable
                        isLoading={loading}
                        data={suppliesData}
                        cartridges={cartridgesData}
                        handleSupplyDelete={this.supplyApi.delete}
                        handleSupplyCreate={this.supplyApi.create}
                        handleSupplyUpdate={this.supplyApi.update}
                    />
                </Grid>
                <Grid key="orders" xs={12} lg={12} item>
                    <OrdersTable
                        isLoading={loading}
                        data={ordersData}
                        cartridges={cartridgesData}
                        handleCreate={this.orderApi.create}
                        handleUpdate={this.orderApi.update}
                        handleDelete={this.orderApi.delete}
                    />
                </Grid>

                {/* FIXME: Chat area overlaps the clickability of objects underneath it
                <Grid>
                    <Chat data={chatMessageHistory} />
                </Grid> */}
            </Grid>
        );
    }
}

export default withSnackbar(Home);
