const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000

let app = express()
let gameModel = require("./models/gameModel")
let User  = require('./models/user')

app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded());
app.set("view engine", "ejs");

// Basic Express Translation =====================================================================

app.get('/', (req, res) => 
{
    console.log("Rendering and Sending 'Login Page'")
    res.render('login');
});

app.get('/home', (req, res) => 
{
    console.log("Rendering and Sending 'Landing Page'")
    res.render('landingPage');
})

app.get('/services', (req, res) => 
{
    console.log("Rendering and Sending 'Services Page'")
    res.render('servicesPage')
})

app.get('/games', async (req, res) => 
{
    let games = await gameModel.find();
    // console.log(games)
    res.render('games.ejs',{games})
})

// ==============================================================================================

// GAME CRUD ====================================================================================

app.get('/delete:id', async (req, res) => {
    console.log(`Game ID Deletion: ${{_id:(req.params.id).split(":")[1]}}`)
    let gameToDelete = await gameModel.findByIdAndDelete({_id:(req.params.id).split(":")[1]})
    console.log(`Game Deleted: ${gameToDelete}`)
    res.redirect('/games')
})

app.get('/add', (req, res) =>
{
    res.render('add.ejs')
})

app.post('/addGame', async (req, res, next) => 
{
    console.log(req.body)
    let gameToAdd = new gameModel()
    gameToAdd.title = req.body.title
    gameToAdd.genre = req.body.genre
    gameToAdd.downloads  = req.body.downloads
    await gameToAdd.save()
    res.redirect('/games')
})

// ================================================================================================

// User CRUD ======================================================================================
// 
// app.post('/register', async (req, res) => {
//     let user = await User.find({ email: req.body.email})
//     // if(user) return res.status(400).send("User with given email already exists");
//     console.log(req.body)
//     let userToRegister = new User()
//     userToRegister.name = req.body.name
//     userToRegister.email = req.body.email
//     userToRegister.password  = req.body.password
//     await userToRegister.save()
//     res.redirect('/')
// })
const bcrypt = require("bcryptjs");

  app.post("/register", async (req, res) => {
 console.log(req.body)
    let user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    res.redirect("/");
  });

// =================================================================================================


// user authentication ============================================================================



// const User = require("../models/user");

app.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});


app.post("/login", async (req, res) => {
    console.log("req.body",req.body)
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    // req.session.flash = { type: "danger", message: "User Not Present" };
    // req.flash("danger", "User with this email not present");
    return res.redirect("/");
    
  }
  console.log(user)
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    // req.session.user = user;
    // req.flash("success", "Logged in Successfully");
    return res.redirect("/home");
  } else {
    req.flash("danger", "Invalid Password");
    return res.redirect("/");
  }

});



app.post("/register", async (req, res) => {

  let user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  console.log("user")
  await user.save();
  res.redirect("/");
});


// =========================================================================================


app.listen(PORT, () =>
{
    console.log(`Listening on port: ${PORT}`)
})


const MONGODBURL = "mongodb://127.0.0.1:27017/testDatabase"
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDB: Connected"))
  .catch((error) => console.log(error.message));
