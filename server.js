
const connectDB = require("./db.js");
const Item = require("./models/itemsModel")
const User = require("./models/usersModel")
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");

//Routing
const itemsRouter = require("./routes/items");

//Database

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use("/items", itemsRouter);

const eraseDatabaseOnSync = true;
connectDB().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      User.deleteMany({}),
      Item.deleteMany({}),
    ]);
    createUsersWithMessages();

  }
 
  app.listen(port, () =>
    console.log(`MongoDB listening on port ${port}!`),
  );
});





const createUsersWithMessages = async () => {
  const user1 = new User({
    firstName: 'Ali',
    secondName: 'Sicim',
    userName: 'rwieruch',
    email: 'ali.sicim@gmail.com',
    password: "woijdaom2120",
    isAdmin: false
  });

  const item1 = new Item({ 
    itemName: "Aliye", 
    itemType: "jewellery",
    age: 12,
    price: 12, 
    description: "Yarrak gibi masallah", 
    seller: user1.id
  })

  
  await user1.save();
  await item1.save();
};

module.exports = app;

