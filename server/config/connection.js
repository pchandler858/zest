const mongoose = require("mongoose");

// test  db dd
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zest");

module.exports = mongoose.connection;
