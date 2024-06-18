const express = require("express");
const cors = require("cors");
const router =require ("./app/routes");
const morgan = require("morgan");
const app = express();

// configure cors
app.use(cors());

app.use(morgan("tiny"));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({ extended: true })
);

require("./app/config/dbConnection");


app.get("/", (req, res) => {
    res.json({ message: "Welcome to Laptop Tracking Management System." });
});
app.use('/',router)


module.exports = app;
