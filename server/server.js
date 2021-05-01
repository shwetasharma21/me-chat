const express = require("express");

const path = require("path");
const cors = require("cors");

const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});

	socket.on("to-server", (data) => {
		console.log("User says", data);
		io.emit("to-client", data);
	});
});

app.use(express.static(path.join(__dirname, "./../build")));
app.use(cors());

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "./../build", "index.html"));
});

const port = process.env.PORT || 7500;
http.listen(port, () => console.log(`Listening on port ${port}...!`));
