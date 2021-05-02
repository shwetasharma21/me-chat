import React, { Component } from "react";

import Navbar from "./components/navbar/navbar";
import ChatScreen from "./components/chatScreen/chatScreen";

import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
class App extends Component {
	state = { isDayMode: true };
	switchMode = () => {
		this.setState({ isDayMode: !this.state.isDayMode });
	};
	render() {
		return (
			<div
				className={
					"container-main" + (this.state.isDayMode ? "" : " dark")
				}
			>
				<ToastContainer />
				<Navbar
					isDayMode={this.state.isDayMode}
					modeHandler={this.switchMode}
				/>
				<div className="content-container-main">
					<ChatScreen isDayMode={this.state.isDayMode} />
				</div>
			</div>
		);
	}
}

export default App;
