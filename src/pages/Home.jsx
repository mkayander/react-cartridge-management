import React, {Component} from "react";

import {Grid} from "@material-ui/core";

import {withSnackbar} from "notistack";

import {
    CartridesTable,
    SuppliesEditable,
    OrdersTable,
    Chat,
} from "../components";
import {CommonApi} from "../api/CommonApi";
import {fetchAll} from "../api";

import {isMobile} from "react-device-detect";
import {Redirect} from "react-router-dom";
import {listCookies} from "../utils/listCookies";
import ServiceTable from "../components/ServiceTable/ServiceTable";
import {getWsLiveDataUrl} from "../api/urls";

class Home extends Component {
    state = {
        loading: false,
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
        serviceData: [],
        chatMessageHistory: [],
    };

    displayActions = {
        success: async (msg) => {
            this.props.enqueueSnackbar(msg, {variant: "success"});
        },
        error: async (msg) => {
            this.props.enqueueSnackbar(`${msg}`, {variant: "error"});
            console.log("dispError:", msg);
        },
        msg: async (msg) => {
            this.props.enqueueSnackbar(msg);
        },
    };

    connect = () => {
        var ws = new WebSocket(getWsLiveDataUrl());

        ws.onmessage = (e) => {
            var data = JSON.parse(e.data);
            this.handleRefresh();
        };

        ws.onopen = () => {
            console.log("Connect to live data")
        };

        ws.onclose = () => {
            setTimeout( () => {
                this.connect();
            }, 1000);
        };
    };

    handleRefresh = async () => {
        this.setState({loading: true});
        await fetchAll()
            .then((response) => {
                if (response) {
                    const {
                        cartridges,
                        supplies,
                        orders,
                        chatMessage,
                        service,
                    } = response.data;
                    this.setState({
                        cartridgesData: cartridges,
                        suppliesData: supplies,
                        ordersData: orders,
                        serviceData: service,
                        chatMessageHistory: chatMessage,
                    });
                }
            })
            .catch((error) => {
                this.displayActions.error(error);
            })
            .finally(() => this.setState({loading: false}));
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
            setLoading: (bool) => this.setState({loading: bool}),
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
            setLoading: (bool) => this.setState({loading: bool}),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        }
    );

    serviceApi = new CommonApi(
        "service/",
        {
            create: {
                success: "Заявка на ремонт создана успешно!",
                error: "Не удалось создать заявку!",
            },
            update: {
                success: "Заявка на ремонт обновлена успешно!",
                error: "Не удалось обновить заявку!",
            },
            delete: {
                success: "Зявка на ремонт удалёна успешно!",
                error: "Не удалось удалить заявку!",
            },
        },
        {
            refreshAll: this.handleRefresh,
            setLoading: (bool) => this.setState({loading: bool}),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        }
    );

    async componentDidMount() {
        await this.connect();
        await this.handleRefresh();
        console.table(listCookies());
    }

    render() {
        const {
            chatMessageHistory,
            loading,
            cartridgesData,
            suppliesData,
            ordersData,
            serviceData,
        } = this.state;

        if (isMobile && this.props.location.backLink === undefined) {
            return <Redirect to="/mobile"/>;
        } else {
            return (
                <Grid container spacing={3}>
                    <Grid key="cartridges" xs={12} lg={4} item>
                        <CartridesTable cartridges={cartridgesData}/>
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
                            handleRefresh={this.orderApi.callbacks.refreshAll}
                            handleCreate={this.orderApi.create}
                            handleUpdate={this.orderApi.update}
                            handleDelete={this.orderApi.delete}
                        />
                    </Grid>
                    <Grid key="service" xs={12} lg={12} item>
                        <ServiceTable
                            isLoading={loading}
                            data={serviceData}
                            handleRefresh={this.serviceApi.callbacks.refreshAll}
                            handleCreate={this.serviceApi.create}
                            handleUpdate={this.serviceApi.update}
                            handleDelete={this.serviceApi.delete}
                        />
                    </Grid>
                    <Chat data={chatMessageHistory}/>
                </Grid>
            );
        }
    }
}

export default withSnackbar(Home);
