const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mrest", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("Error connecting DB");
});

db.once("open", () => {
  console.log("Successfully connected to MongoDB");
});
