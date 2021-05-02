import React, { Component } from "react";

import "./navbar.css";

class Navbar extends Component {
	render() {
		return (
			<div className="nav-container">
				<div className="nav-item">
					<img src="logo.png" alt="" className="nav-icon" />
					<b>Me Chat</b>
				</div>
			</div>
		);
	}
}

export default Navbar;
