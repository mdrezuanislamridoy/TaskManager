const mongoose = require("mongoose");
require("dotenv");

const MongoConnection = async () => {
  const con = await mongoose.connect(process.env.DB_URL);

  if (con) {
    console.log("DB connected");
  }
};

module.exports = MongoConnection;
