import React, { Component } from "react";
import { withSnackbar } from "notistack";

import {
    Widget,
    addResponseMessage,
    addUserMessage,
    markAllAsRead,
    renderCustomComponent,
} from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import { Button } from "@material-ui/core";
import { getCookie } from "../../utils/getCookie";
import { getWsChatUrl } from "../../api/urls";

import styles from "./Chat.module.scss";
import CustomMessage from "./CustomMessage";

export class Chat extends Component {
    state = {
        user: null,
        ws: null,
        connectState: null,
    };

    async componentDidMount() {
        this.connect();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.data !== undefined &&
            this.props.data.length !== prevProps.data.length
        ) {
            this.chatHistoryLoad();
        }
    }

    handleNewUserMessage = (newMessage) => {
        this.state.ws.send(
            JSON.stringify({
                user: this.state.user,
                message: newMessage,
            })
        );
    };

    divider = () =>{
        return <hr className={styles["rcw-divider"]} data-content="new messages" />
    };

    chatHistoryLoad() {
        this.props.data.forEach((element) => {
            // addResponseMessage(element.message);
            renderCustomComponent(CustomMessage, {
                msgData: element,
                client: element.user === this.state.user,
            });
        });
        renderCustomComponent(this.divider, null);
        markAllAsRead();
    }

    connect = () => {
        var ws = new WebSocket(
            // "ws://" + window.location.host.split(":")[0] + "/chat"
            // "ws://it-vlshv.dellin.local/chat"
            getWsChatUrl()
        );

        ws.onmessage = (e) => {
            var data = JSON.parse(e.data);
            var message = data["message"];
            var user = data["user"];
            if (this.state.user !== user) {
                addResponseMessage(message);
            }
        };

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            this.chatHistoryLoad();

            this.props.closeSnackbar();

            this.setState({
                ws: ws,
            });

            let username = getCookie("name");

            if (username !== undefined) {
                this.setState({
                    user: username,
                });
            } else {
                username = Math.random();
                document.cookie = "name=" + username;
                this.setState({
                    user: username,
                });
            }
            console.log(username);
        };

        // websocket onclose event listener
        ws.onclose = (e) => {
            this.props.enqueueSnackbar("Нет подключения к чату", {
                variant: "error",
                persist: true,
                preventDuplicate: true,
                action: (key) => (
                    <Button color="inherit" onClick={() => this.connect()}>
                        Переподключится
                    </Button>
                ),
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "right",
                },
            });

            this.setState({ ws: null, user: "не подключен" });
        };

        // websocket onerror event listener
        ws.onerror = (err) => {
            console.error("Socket encountered error: ", err, "Closing socket");

            ws.close();
        };
    };

    render() {
        if (this.state.ws !== null) {
            return (
                <div className={styles["rcw-widget-container"]}>
                    <Widget
                        theme={styles}
                        handleNewUserMessage={this.handleNewUserMessage}
                        title="Чат"
                        subtitle={"User id " + this.state.user}
                    />
                </div>
            );
        }
        return null;
    }
}

export default withSnackbar(Chat);
