const dev = {
	serverUrl: "http://localhost:7500",
};

const prod = {
	serverUrl: "/",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
