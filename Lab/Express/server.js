const express = require("express")
let server = express()

server.set("view engine", "ejs");
server.get("/", (req, res)=>
{
    res.render("homepage");
});
server.listen(4500)

