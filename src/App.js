import React, { Component } from "react";

import Navbar from "./components/navbar/navbar";
import ChatScreen from "./components/chatScreen/chatScreen";

import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.min.css";
class App extends Component {
	state = {};
	render() {
		return (
			<div className="container-main">
				<ToastContainer />
				<Navbar />
				<div className="content-container-main">
					<ChatScreen />
				</div>
			</div>
		);
	}
}

export default App;
