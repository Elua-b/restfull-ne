const { Sequelize } = require("sequelize");
const { debuglog } = require("util");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const env = process.env.NODE_ENV || "development";

let loggingOption;

if (env === "production") {
  loggingOption = false; // Disable logging in production
} else {
  const logFile = fs.createWriteStream(
    path.join(__dirname, "..", "sql_logs.txt"),
    { flags: "a" }
  );
  loggingOption = (msg) => logFile.write(`${msg}\n`); 
}
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  logging: false,
  host: DB_HOST,
  dialect: "postgresql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log(`✔ server started on http://localhost:${process.env.PORT}`);
    debuglog(`✔ server started on http://localhost:${process.env.PORT}`);
  })
  .catch((err) => {
    console.error("❌ server did not start properly");
    debuglog(`❌ server did not start properly`);
    debuglog(err);
  });
