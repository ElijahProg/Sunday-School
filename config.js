require("dotenv");

const { DB_PORT, DB_NAME } = process.env;

module.exports = {
  dbUrl: "mongodb://mongo:27017/sunday_db", // + DB_NAME,
};
