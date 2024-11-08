const mongoose = require("mongoose");
require("dotenv");

const DB_URL = "mongodb+srv://mdrezuanislamridoy:RRRidoy781@rrcluster.dzwno.mongodb.net/TaskManager?retryWrites=true&w=majority"

const database  = {} 
database.connectDB = async () => {
    console.log("hello db");
   mongoose.connect(DB_URL).then(() => {
        console.log("connected to db");
    }).catch((err) => {
        console.log(err);
    });
};

module.exports = database;
