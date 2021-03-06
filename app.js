const express = require("express");
const bodyParser = require("body-parser");
const http = require("https");
var app = express();

app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

var items=["Buy food","Cook food","Eat food"];

app.get("/", function (req, res) {

var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

var currentday=today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

  res.render("list", { KindofDay: currentday,NewItem: items });
});


app.post("/",function(req,res){

 var item= req.body.fname;
 items.push(item);
 res.redirect("/");

});




app.listen(3000, function () {
  console.log("Server started at 3000");
});


