const express  = require("express");
const path = require("path");
const app =  express();
const port = "80";
 const bodyparser = require("body-parser")
//mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');


const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    Addr: String,
    conc: String
  });

const contact = mongoose.model('contact', ContactSchema);


//For serving as static files
app.use("/static",express.static("static"));
//for conversion into pug form html
app.use(express.urlencoded());
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>
{
    const content = {}
    res.status(200).render("home.pug",content);
});

app.get("/contact",(req,res)=>
{
    const content = {}
    res.status(200).render("contact.pug",content);
});

app.post("/contact",(req,res)=>
{
    var mydata = new contact(req.body);
    mydata.save().then(()=>
    {
        res.send("This data has been saved to the database");
    }).catch(()=>
    {
    res.status(400).send("error")
    });
     
    
});

app.listen(port,(req,res)=>
{   console.log(contact.find({name:"PINTA RAM"}).name);
    console.log(`Namasthe Bhai on ${port}`);
});


