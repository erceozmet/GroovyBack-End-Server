
const connectDB = require("./db.js");

const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const itemsRouter = require("./routes/items");


connectDB();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use("/items", itemsRouter);



app.listen(port, function(){
  console.log("Port: " + port);
})

module.exports = app;

