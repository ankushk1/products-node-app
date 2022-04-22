const express = require("express");
const app = express();
const port = "8000";
const bodyParser = require("body-parser");
const db = require("./config/mongoose");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.set('secretKey', "nodeApp")

app.listen(port, () => {
  console.log(`server running successfully on port:${port}`);
});
