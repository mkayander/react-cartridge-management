import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { getWsChatUrl } from "../../api/urls";
import { getCookie } from "../../utils/getCookie";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import { withSnackbar } from "notistack";
import SendIcon from "@material-ui/icons/Send";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import IconButton from "@material-ui/core/IconButton";
import "./CustomChatStyle.css";
import Badge from "@material-ui/core/Badge";

class CustomChat extends Component {
    state = {
        chatHiddenOrActive: "hidden",
        btnLaunchClick: true,
        user: null,
        ws: null,
        messageResponse: [],
        newMessageList: [],
        msgInput: "",
        msgBadge: 0,
    };

    messagesEndRef = React.createRef();
    nameInput = React.createRef();
    messageList = [];
    newMessageList = [];

    async componentDidMount() {
        this.connect();
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom();
        if (
            this.props.data !== undefined &&
            this.props.data.length !== prevProps.data.length
        ) {
            this.chatHistoryLoad();
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        if (this.messagesEndRef.current !== null) {
            this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    chatHistoryLoad() {
        if (this.state.messageResponse.length === 0) {
            this.props.data.reverse().forEach((element, index) => {
                const end_date = new Date(element.date).toLocaleString();
                this.messageList.push(
                    this.generate(
                        element.message,
                        index,
                        end_date,
                        element.user === this.state.user
                    )
                );
                this.setState({ messageResponse: this.messageList });
            });
        }
    }

    connect = () => {
        var ws = new WebSocket(getWsChatUrl());

        ws.onmessage = (e) => {
            var data = JSON.parse(e.data);
            this.chatHistoryLoad();
            data.time = new Date();

            this.setState((prevState) => ({
                newMessageList: [...prevState.newMessageList, data],
            }));
            if (this.state.btnLaunchClick) {
                this.setState((prevState) => ({
                    msgBadge: prevState.msgBadge + 1,
                }));
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
            // console.log(username);
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

    handleMsgInput = (event) => {
        this.setState({ msgInput: event.target.value });
    };

    handleNewUserMessage = () => {
        if (this.state.msgInput.trim() !== "") {
            this.state.ws.send(
                JSON.stringify({
                    user: this.state.user,
                    message: this.state.msgInput,
                })
            );
        }
        this.setState({ msgInput: "" });
    };

    handlePressKey = (event) => {
        if (event.key === "Enter") {
            this.handleNewUserMessage();
        }
    };

    handleLaunchBtn = () => {
        if (this.state.btnLaunchClick) {
            this.setState({ btnLaunchClick: false });
            this.setState({ chatHiddenOrActive: "active" });
            this.nameInput.focus();
            this.setState({ msgBadge: 0 });
        } else {
            this.setState({ chatHiddenOrActive: "hidden" });
            this.setState({ btnLaunchClick: true });
        }
    };

    closeBtnGenerate() {
        if (this.state.btnLaunchClick) {
            return (
                <ChatOutlinedIcon
                    fontSize="large"
                    classes={{ root: "rcw-customchat-launcher-icon" }}
                />
            );
        } else {
            return (
                <CloseOutlinedIcon
                    fontSize="large"
                    classes={{ root: "rcw-customchat-launcher-icon" }}
                />
            );
        }
    }

    generate(message, index, date, usOrResp) {
        return (
            <div className="rcw-customchat-message" key={index}>
                <div
                    className={`rcw-customchat-${
                        usOrResp ? "client" : "response"
                    }`}>
                    <div className="rcw-customchat-message-text">
                        <p>{message}</p>
                    </div>
                    <span className="rcw-customchat-timestamp">{date}</span>
                </div>
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Paper
                    elevation={10}
                    classes={{
                        root: `rcw-customchat-main-div ${this.state.chatHiddenOrActive}`,
                    }}>
                    <div className="rcw-customchat-header">
                        <h4 className="rcw-customchat-title">Chat</h4>
                        <span>Welcome {this.state.user}</span>
                    </div>

                    <div className="rcw-customchat-list">
                        {this.state.messageResponse.map((el) => el)}
                        <hr className="hr-text" data-content="New message" />
                        {this.state.newMessageList.map((el, index) =>
                            this.generate(
                                el.message,
                                index,
                                el.time.toLocaleString(),
                                el.user === this.state.user
                            )
                        )}
                        <div ref={this.messagesEndRef} />
                    </div>

                    <div className="rcw-customchat-input-div">
                        <input
                            onChange={this.handleMsgInput}
                            value={this.state.msgInput}
                            placeholder="Type a message..."
                            className="rcw-customchat-input"
                            onKeyPress={this.handlePressKey}
                            ref={(input) => {
                                this.nameInput = input;
                            }}
                        />

                        <Button
                            classes={{ root: "rcw-customchat-sender" }}
                            onClick={this.handleNewUserMessage}>
                            <SendIcon
                                classes={{ root: "rcw-customchat-sender-icon" }}
                            />
                        </Button>
                    </div>
                </Paper>
                <IconButton
                    onClick={this.handleLaunchBtn}
                    classes={{
                        root: `rcw-customchat-launcher ${
                            this.state.ws === null ? "none" : "block"
                        }`,
                    }}
                    color="primary">
                    <Badge
                        badgeContent={this.state.msgBadge}
                        max={100}
                        color="error"
                        classes={{ root: "rcw-customchat-badge" }}>
                        {this.closeBtnGenerate()}
                    </Badge>
                </IconButton>
            </React.Fragment>
        );
    }
}

export default withSnackbar(CustomChat);
