import React, { Component } from "react";

import { Grid } from "@material-ui/core";

import { withSnackbar } from "notistack";

import {
    CartridesTable,
    SuppliesEditable,
    OrdersTable,
    ServicesTable,
    Chat,
} from "../components";
import { CommonApi } from "../api/CommonApi";
import { fetchAll, fetchCartridges } from "../api";

import { isMobile } from "react-device-detect";
import { Redirect } from "react-router-dom";
import { listCookies } from "../utils/listCookies";
import { getWsLiveDataUrl } from "../api/urls";

class Home extends Component {
    state = {
        cartridgesData: [],
        suppliesData: [],
        ordersData: [],
        servicesData: [],
        chatMessageHistory: [],
        loading: {
            cartridge: false,
            supply: false,
            order: false,
            service: false,
        },
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

    connect = () => {
        const ws = new WebSocket(getWsLiveDataUrl());

        ws.onmessage = (event) => {
            const modelName = JSON.parse(event.data)["message"];
            console.log(
                `${new Date().toLocaleTimeString()} -> New update message - ${modelName}`
            );
            this.refreshModel(modelName);
        };

        ws.onopen = () => {
            console.log("Connect to live data");
        };

        ws.onclose = () => {
            setTimeout(() => {
                this.connect();
            }, 1000);
        };
    };

    refreshModel = (modelName) => {
        if (modelName in this.apiControllers) {
            this.apiControllers[modelName].refresh();
        } else {
            console.warn("Invalid model name.");
        }
    };

    handleRefresh = () => {
        this.setState({
            loading: {
                cartridge: true,
                supply: true,
                order: true,
                service: true,
            },
        });
        fetchAll()
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
                        servicesData: service,
                        chatMessageHistory: chatMessage,
                    });
                }
            })
            .catch((error) => {
                this.displayActions.error(error);
            })
            .finally(() =>
                this.setState({
                    loading: {
                        cartridge: false,
                        supply: false,
                        order: false,
                        service: false,
                    },
                })
            );
    };

    apiControllers = {
        Order: new CommonApi(
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
                setState: (data) => this.setState({ ordersData: data }),
                setLoading: (bool) =>
                    this.setState({ loading: { order: bool } }),
                success: this.displayActions.success,
                error: this.displayActions.error,
                msg: this.displayActions.msg,
            }
        ),

        Supply: new CommonApi(
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
                setState: (data) => this.setState({ suppliesData: data }),
                setLoading: (bool) =>
                    this.setState({ loading: { supply: bool } }),
                success: this.displayActions.success,
                error: this.displayActions.error,
                msg: this.displayActions.msg,
            }
        ),

        Service: new CommonApi(
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
                setState: (data) => this.setState({ servicesData: data }),
                setLoading: (bool) =>
                    this.setState({ loading: { service: bool } }),
                success: this.displayActions.success,
                error: this.displayActions.error,
                msg: this.displayActions.msg,
            }
        ),

        Cartridge: {
            refresh: () => {
                return fetchCartridges().then((result) => {
                    this.setState({ cartridgesData: result.data });
                });
            },
        },
    };

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
            servicesData: serviceData,
        } = this.state;

        if (isMobile && this.props.location.backLink === undefined) {
            return <Redirect to="/mobile" />;
        } else {
            return (
                <Grid container spacing={3}>
                    <Grid key="cartridges" xs={12} lg={4} item>
                        <CartridesTable cartridges={cartridgesData} />
                    </Grid>
                    <Grid key="supplies" xs={12} lg={8} item>
                        <SuppliesEditable
                            isLoading={loading.supply}
                            data={suppliesData}
                            cartridges={cartridgesData}
                            apiController={this.apiControllers.Supply}
                        />
                    </Grid>
                    <Grid key="orders" xs={12} lg={12} item>
                        <OrdersTable
                            isLoading={loading.order}
                            data={ordersData}
                            cartridges={cartridgesData}
                            apiController={this.apiControllers.Order}
                        />
                    </Grid>
                    <Grid key="service" xs={12} lg={12} item>
                        <ServicesTable
                            isLoading={loading.service}
                            data={serviceData}
                            apiController={this.apiControllers.Service}
                        />
                    </Grid>
                    <Chat data={chatMessageHistory} />
                </Grid>
            );
        }
    }
}

export default withSnackbar(Home);
