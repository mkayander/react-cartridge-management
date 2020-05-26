import React, {Component} from "react";
import {withSnackbar} from "notistack";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import {getApiUrl} from "../api/urls";
import Button from "@material-ui/core/Button";
import {CommonApi} from "../api/CommonApi";

class MobileHome extends Component {
    state = {
        setLoading: false,
        cartridgesData: [],
        cartIndex: "",
        cart: "",
        countNow: "  ",
        countSupply: 0,
    };

    api = axios.create({
        baseURL: getApiUrl(),
        responseType: "json",
    });

    componentDidMount() {
        this.getCartridges();
    }

    async getCartridges() {
        return this.api.get("cartridges/").then((response) => {
            if (response) {
                this.setState({
                    cartridgesData: response.data
                });
            }
        })
    };

    handleChange = (event) => {
        const val = event.target.value;
        const count = this.state.cartridgesData[val].count;
        const name = this.state.cartridgesData[val].name;
        return this.setState({cartIndex: val, countData: count, cart: name})
    };

    handleChangeCount = (event) => {
        return this.setState({countSupply: event.target.value})
    };

    displayActions = {
        success: async (msg) => {
            this.props.enqueueSnackbar(msg, {variant: "success", persist: true});
        },
        error: async (msg) => {
            this.props.enqueueSnackbar(`${msg}`, {variant: "error", persist: true});
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
            }
        },{
            refreshAll: () => (null),
            // setState: (value) => this.setState({ suppliesData: value }),
            setLoading: (bool) => this.setState({loading: bool}),
            success: this.displayActions.success,
            error: this.displayActions.error,
            msg: this.displayActions.msg,
        });

    createSupplyOut = () => (
        this.supplyApi.create(
            {
                out: true,
                count: this.state.countSupply,
                cartridge: this.state.cart,
            }
        )
    );

    render() {
        return (
            <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  spacing={3}>
                <Grid item>
                    <TextField
                        style={{width: 230}}
                        id="outlined-select-currency"
                        select
                        label="Картридж"
                        value={this.state.cartIndex}
                        onChange={this.handleChange}
                        helperText={`Осталось картриджей ${this.state.countData}`}
                        variant="outlined"
                    >
                        {this.state.cartridgesData.map((option, index) => (
                            <MenuItem key={option.name} value={index}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item>
                    <TextField
                        style={{width: 230}}
                        id="outlined-number"
                        label="Количество"
                        type="number"
                        InputLabelProps={{shrink: true}}
                        variant="outlined"
                        onChange={this.handleChangeCount}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={() => this.createSupplyOut()}>Выдать</Button>
                    <Link style={{paddingLeft: 10}} to={{
                        pathname: "/",
                        backLink: false
                    }}>
                        <Button variant="contained" color="primary">На главную</Button>
                    </Link>
                </Grid>
            </Grid>
        )
    }
}

export default withSnackbar(MobileHome);