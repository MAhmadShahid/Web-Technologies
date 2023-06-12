const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const server = express();
const cors = require("cors")
let BookingModel = require("./model/bookingModel");
//Set View Engine

//Use For Body Parser
server.use(express.json());
server.use(cors());
//getting data from url
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());

//Define Static Folder
server.use(express.static("public"));
const PORT = 3000;


server.get("/", async (req, res) => {
  let bookings = await BookingModel.find();
  console.log(bookings);
  res.send(bookings);
});

server.post("/", async (req, res, next) => {
  let booking = new BookingModel(req.body);
  await booking.save();
  res.send({
    message: "Record added succefully",
  });
});





server.listen(PORT, () => {
  console.log(`Server is running on  port ${PORT}`);
});

const MONGODBURL =
  "mongodb://127.0.0.1:27017/testDatabase";
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));