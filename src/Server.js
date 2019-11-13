const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RoundTable =require('./Models/Entryschema');
const nodmon = require('nodemon');
// const mongodb = context.services.get("mongodb-atlas");
// const JournalEntry = mongodb.db("mature-masculinity").collection("RoundTable");
const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://Westongb:Abc123890@mature-masculinity-nteci.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { 
  console.log("Connected to Mongodb")

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get" , function(req, res){
  const docs =  RoundTable.find({},function(
    err,data) {
    if (err) {
      return res.json({Message:'this didnt work'})
    } else {
    res.json(data);
    console.log(data)
    }
  });
  console.log(docs);
});

app.post('/post', function(req,res){
  const NewEntry= new RoundTable({
    _id:new mongoose.Types.ObjectId(),
   setDate: req.body.setDate,
  Journal: req.body.Journal
  })

  NewEntry.save().then(result=>{
    console.log(result);
  })
  .catch(err => console.log(err));
  res.status(201).json({
    message: "Handling Post"
  })
})
});

app.listen(port, () => console.log(`Listening on port ${port}`));