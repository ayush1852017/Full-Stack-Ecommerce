const express = require("express");
const app = express();
const errorMiddleware = require("./Middleware/error");

app.use(express.json());

// Routes import
const product = require("./Routes/products.route");
const user = require("./Routes/user.route");

app.use("/api", product);
app.use("/api", user);

// Middleware for Error handlers
app.use(errorMiddleware);

module.exports = app;
