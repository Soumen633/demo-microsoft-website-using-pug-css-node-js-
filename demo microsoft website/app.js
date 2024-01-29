//IMPORTING MODULES.
const express=require('express');
const http=require('http');
const port=8000;
const app=express();
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/contactDance',{useNewUrlParser:true});

//DEFINE MONGOOSE SCHEMA
var contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:String,
    phone_number:String
});
var contact=mongoose.model('contact', contactSchema);

//GIVE ACCESS THE TO THE WEBSITE TO USE FILE INSIDE STATCI
app.use('/static', express.static('static'));

//SETTING UP PUG AS VIEW ENGINE & AND SPECIFYING ITS PATH.
app.set('view engine', 'pug');

//SETTING UP THE GET REQUEST(MEANS SETTING UP WHAT TO SHOW ACCORDING TO THE URL).
app.get("/", (req, res)=>{
    res.status(200).render('index.pug');
})
app.get("/contact_us", (req, res)=>{
    res.status(200).render('contact.pug');
})

// app.set('views', path.join(__dirname, 'views'));
//POST TO SAVE DATA
app.post("/contact_us", (req, res)=>{
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("item was not saved to the database");
    });
    
});


//SETTING UP THE SERVER END ENDPOINT(MEEANS OUR SYSTEM WILL HOST THE WEBSITE ON OUR LOCAL HOST AT THE PROVIDED PORT).
app.listen(port, ()=>{
    console.log(`Your server started sucessfully on the port ${port}`)
})