const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productsRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");


const app = express();

mongoose.connect(
  "mongodb+srv://Khattab:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-amjzm.mongodb.net/test",

    { useNewUrlParser: true , useUnifiedTopology: true}
)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/products", productsRoutes);
app.use("/api/cart" , cartRoutes);


module.exports = app;
