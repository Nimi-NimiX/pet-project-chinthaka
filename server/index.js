const express = require("express");
const cors = require("cors");
require("dotenv").config();

/**
 * import all routes
 */
const budgetRouter = require("./routes/budgetRouter");
const transactionRouter = require("./routes/transactionRouter");
const categoryRouter = require("./routes/contegoryRouter");

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

/**
 * middlewares
 */
app.use(cors());
app.use(express.json());

// routes

/**
 * handle all budget related routes and logic
 */
app.use("/budget", budgetRouter);

/**
 * handle all transaction related routes and logic
 */
app.use("/transaction", transactionRouter);

/**
 * get all categories and add new categories through this route
 */
app.use("/category", categoryRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
