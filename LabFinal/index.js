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


  // server.get("/add", (req, res, next) => {
//   res.render("add");
// });
// server.get("/contactus", (req, res, next) => {
//   res.render("contactus");
// });
// server.get("/about", (req, res, next) => {
//     res.render("about");
//   });

 

//   server.get("/view/:id", async(req, res, next) => {
//     console.log("ID:",req.params.id)
//     let products = await Products.findById(req.params.id);
//     console.log("Products",products)
//     res.render("view",{data:products});
//   });

//   server.get("/edit:id", async(req, res, next) => {
//     console.log("IDD",req.params.id)
//     let students = await Students.find({_id:(req.params.id).split(":")[1]});
//     console.log("Students find",students)
//     res.render("edit",{data:students[0]});
//   });
//   server.post("/update", async(req, res, next) => {
//     console.log("body in update",req.body)
//     let students = await Students.find({rollnumber:req.body.rollnumber});
//     let stude = await Students.updateOne({_id:students[0]._id},req.body);
//     console.log("Students find in original",students)
//     console.log("Students find in update",stude)
//     res.redirect('/')
//   });


//   //Students
//   server.post('/addStudents',async(req,res,next)=>{
    
//     let student = new Students(req.body);
//     await student.save();
//     res.redirect('/')
//   })

//   server.get("/delete:id", async(req, res, next) => {
//     console.log("IDD",req.params.id)
//     let students = await Students.findByIdAndDelete({_id:(req.params.id).split(":")[1]});
//     console.log("Students deleted",students);
//     res.redirect('/')
//   });
//   server.use((req, res, next) => {
//     res.render("notfound");
//   });