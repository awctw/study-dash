const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

mongoose.set('strictQuery', true);

db.mongoose = mongoose;

db.user = require("./user.model");

module.exports = db;
