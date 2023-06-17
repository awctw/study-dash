const mongoose = require('mongoose').default;
require('dotenv').config(); // V.imp for accessing env variables

const uri = process.env.DB_URI;


const connect = async () => {
    await mongoose.connect(uri);
    console.log("Successfully connected to database.");
}

module.exports = connect;