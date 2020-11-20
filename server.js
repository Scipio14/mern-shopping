const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());
//DB config

const db = require("./config/keys").mongoURI;

//connect to mongodb

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("mongodb connected..."))
  .catch((err) => console.log(err));

//Use Routes

app.use("/api/items", items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
