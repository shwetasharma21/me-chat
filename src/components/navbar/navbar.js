import React from "react";

import "./navbar.css";

const Navbar = (props) => {
	return (
		<div className={"nav-container" + (props.isDayMode ? "" : " dark")}>
			<div className="nav-item">
				<img src="logo.png" alt="" className="nav-icon" />
				<b>Me Chat</b>
			</div>
			<div className="nav-item">
				<img
					src={props.isDayMode ? "light_mode.png" : "dark_mode.png"}
					alt=""
					className={
						"nav-icon nav-icon-btn" +
						(props.isDayMode ? "" : " dark")
					}
					onClick={props.modeHandler}
				/>
			</div>
		</div>
	);
};

export default Navbar;
