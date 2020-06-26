import React, { Component } from "react";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import api from "../api/api";
import Button from "@material-ui/core/Button";
import { CommonApi } from "../api/CommonApi";
import Paper from "@material-ui/core/Paper";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { withQueryParams, StringParam, withDefault } from "use-query-params";

class MobileHome extends Component {
    state = {
        setLoading: false,
        currCartridge: null,
        cartridgesData: [],
        cartIndex: "",
        cart: "",
        countNow: "  ",
        countSupply: 0,
        commit: "",
    };

    componentDidMount() {
        this.getCartridges().then(() => {
            if (this.props.query.cartridge) {
                this.setState({
                    currCartridge: this.getCartridgeByName(
                        this.props.query.cartridge
                    ),
                });
            }
        });
    }

    async getCartridges() {
        return api.get("cartridges/").then((response) => {
            if (response) {
                this.setState({
                    cartridgesData: response.data,
                });
            }
        });
    }

    handleChangeCartridge = (event) => {
        const name = event.target.value;
        this.setState({ currCartridge: this.getCartridgeByName(name) });
        this.props.setQuery({ cartridge: name });
    };

    handleChangeCount = (event) => {
        this.setState({ countSupply: event.target.value });
    };

    handleChangeComment = (event) => {
        this.setState({ commit: event.target.value });
    };

    displayActions = {
        success: async (msg) => {
            this.props.enqueueSnackbar(msg, {
                variant: "success",
                persist: true,
            });
        },
        error: async (msg) => {
            this.props.enqueueSnackbar(`${msg}`, {
                variant: "error",
                persist: true,
            });
            console.log("dispError:", msg);
        },
        msg: async (msg) => {
            this.props.enqueueSnackbar(msg);
        },
    };

    supplyApi = new CommonApi(
        "supplies/",
        {
            create: {
                success: "Перемещение создано успешно!",
                error: "Не удалось создать перемещение!",
            },
        },
        {
            refreshAll: () => null,
            // setState: (value) => this.setState({ suppliesData: value }),
            setLoading: (bool) => this.setState({ loading: bool }),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        }
    );

    createSupplyOut = () =>
        this.supplyApi.create({
            out: true,
            count: this.state.countSupply,
            cartridge: this.state.currCartridge.name,
            comment: this.state.commit,
        });

    getCartridgeByName = (name) => {
        return this.state.cartridgesData.find((c) => c.name === name);
    };

    render() {
        const { cartridgesData, currCartridge } = this.state;

        return (
            <Paper elevation={5} style={{ maxWidth: 300 }}>
                <TextField
                    style={{
                        width: 230,
                        padding: 10,
                        marginLeft: 20,
                        marginTop: 20,
                    }}
                    id="outlined-select-currency"
                    select
                    label="Картридж"
                    value={currCartridge ? currCartridge.name : ""}
                    onChange={this.handleChangeCartridge}
                    helperText={
                        currCartridge
                            ? `Осталось картриджей - ${currCartridge.count}`
                            : null
                    }
                    variant="outlined">
                    {cartridgesData.map((option, index) => (
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                <br />
                <TextField
                    style={{ width: 230, padding: 10, marginLeft: 20 }}
                    id="outlined-number"
                    label="Количество"
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    onChange={this.handleChangeCount}
                />
                <br />
                <TextField
                    style={{ width: 230, padding: 10, marginLeft: 20 }}
                    id="outlined-basic"
                    label="Комментарий"
                    variant="outlined"
                    onChange={this.handleChangeComment}
                />
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    style={{
                        width: 100,
                        height: 40,
                        marginLeft: 30,
                        marginBottom: 20,
                        marginTop: 10,
                        color: "white",
                    }}
                    onClick={this.createSupplyOut}>
                    <span>ВЫДАТЬ</span>
                </Button>
                <Link
                    style={{ marginLeft: 30 }}
                    to={{
                        pathname: "/",
                        backLink: false,
                    }}>
                    <Button
                        style={{
                            width: 100,
                            height: 40,
                            marginBottom: 20,
                            marginTop: 10,
                        }}
                        variant="contained"
                        color="primary">
                        <HomeRoundedIcon />
                    </Button>
                </Link>
            </Paper>
        );
    }
}

export default withQueryParams(
    { cartridge: withDefault(StringParam, "") },
    withSnackbar(MobileHome)
);
