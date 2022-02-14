const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://Janstopot:1qazxsw2@cluster0.yx19v.mongodb.net/express-basic-auth?retryWrites=true&w=majority"



mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
