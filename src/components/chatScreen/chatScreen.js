import React, { Component } from "react";
import { toast } from "react-toastify";

import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

import { config } from "./../../config/config";

import "./chatScreen.css";
class ChatScreen extends Component {
	state = {
		counter: 0,
		messages: [],
		msgTxt: "",
		msgChatRef: React.createRef(),
		msgBoxRef: React.createRef(),
		id: undefined,
	};
	componentDidMount() {
		this.setState({ id: uuidv4() });
		this.state.msgBoxRef.current.focus();

		this.socket =
			process.env.NODE_ENV === "development"
				? io.connect(config.serverUrl)
				: io.connect();
		const socket = this.socket;

		socket.on("connect", () => {
			toast.success("Connected to server..!");
			//socket.send("hello");
			//socket.emit("to-server", "Hello..!");
		});

		socket.on("disconnect", () => {
			toast.error("Disconnected from server..!");
		});

		socket.on("to-client", (data) => {
			console.log(data);
			if (data.id !== this.state.id) {
				this.addMsgToChat(data.msgTxt);
			}
		});
	}
	onMsgTxtChange = (event) => {
		const msgTxt = event.target.value;
		this.setState({ msgTxt });
	};
	handleKeyPress = (event) => {
		const key = event.key;
		if (key === "Enter") {
			this.sendMsg();
		}
	};
	sendMsg = () => {
		const { msgTxt, id } = this.state;
		if (msgTxt === "") return;

		this.addMsgToChat(msgTxt, true);

		this.socket.emit("to-server", { id, msgTxt });
	};
	addMsgToChat = (msg, isMine = false) => {
		const { counter } = this.state;

		this.state.messages.push({
			id: counter,
			text: msg,
			isMine,
		});

		this.setState({ msgTxt: "", counter: counter + 1 }, () => {
			const msgChatRef = { ...this.state.msgChatRef };
			msgChatRef.current.scrollTop = msgChatRef.current.scrollHeight;
			this.setState({ msgChatRef });
		});
	};
	render() {
		return (
			<div className="msg-container-main">
				<div ref={this.state.msgChatRef} className="msg-window">
					{this.state.messages.map((msg) => (
						<div key={msg.id}>
							<h2
								className={`msg-bubble ${
									msg.isMine ? "bubble-float-right" : ""
								} ${this.props.isDayMode ? "" : " dark"}`}
							>
								{msg.text}
							</h2>
						</div>
					))}
				</div>
				<div className="msg-input-container">
					<input
						ref={this.state.msgBoxRef}
						type="text"
						className={
							"msg-input-box" +
							(this.props.isDayMode ? "" : " dark")
						}
						placeholder="Enter message"
						value={this.state.msgTxt}
						onChange={this.onMsgTxtChange}
						onKeyPress={this.handleKeyPress}
					/>
					<img
						src={
							this.props.isDayMode
								? "send_msg.png"
								: "send_msg_dark.png"
						}
						alt=""
						className={
							"msg-send" + (this.props.isDayMode ? "" : " dark")
						}
						onClick={(e) =>
							this.state.msgTxt === ""
								? e.preventDefault()
								: this.sendMsg()
						}
					/>
				</div>
			</div>
		);
	}
}

export default ChatScreen;
