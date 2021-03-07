const express = require("express");
const bodyParser = require("body-parser");
const http = require("https");
var app = express();


const mongoose=require("mongoose");


mongoose.connect("mongodb://localhost:27017/ToDoListDB", {useNewUrlParser: true, useUnifiedTopology: true});


const ItemSchema= new mongoose.Schema({
  name:String,  
});

//usually capitalised
const Item=mongoose.model("Item",ItemSchema);


const item1=new Item({
  name:"Welcome to your todo list",
});

const item2=new Item({
  name:"Hit the + button to add a new item",
});

const item3=new Item({
  name:"<-- Hit this to delete",
});


const defaultItems=[item1,item2,item3];



app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get("/", function (req, res) {

Item.find({},function(err,results)
{
  if (results.length===0)
  {
    Item.insertMany(defaultItems,function(err){

      if (err)
      {
        console.log("error occured");
      }
      else{
      
        console.log("Success");
      }
      });
      res.redirect();
    }
  else{
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today  = new Date();
    var currentday=today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
    res.render("list", { KindofDay: currentday,NewItem: results });
  }

});




});


app.post("/",function(req,res){

 var newitem= req.body.fname;

  const Newitem=new Item({
    name:newitem,
  });

  Newitem.save();
  res.redirect("/");

});


app.post("/delete",function(req,res)
{

  var ItemID=req.body.checkbox
  console.log(ItemID);

  Item.findByIdAndDelete(ItemID,function(err)
  {

    if (err)
    {
      console.log(err);

    }
    res.redirect("/");

  })




});





app.listen(3000, function () {
  console.log("Server started at 3000");
});


