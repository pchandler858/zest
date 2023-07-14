const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://pchandler858:Password12345678@zest.2mczm7x.mongodb.net/zest";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting to the database: " + err));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zest");

module.exports = mongoose.connection;
