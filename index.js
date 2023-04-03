const mongoose = require("mongoose")
const express = require("express")
const app = express();
require('dotenv').config();
const route = express.Router();
const foodModel = require("./channel");
const PORT = 3000;
const multer = require('multer');
const dbUrl=process.env.MONGO_URI
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data
  

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,};

mongoose.connect(dbUrl, connectionParams).then(
    ()=>{
        console.log(
            "connection to the DB"
        )
    }
)
.catch((e) => {
    console.log("Error:", e);
});

const cors = require('cors')

app.use(cors())
app.listen(PORT, () => {
    console.log(`Listening on POST: ${PORT}`);
});

app.get("/foods", async (request, response) => {
    const foods = await foodModel.find({});
  
    try {
      response.send(foods);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  
app.post("/food", async (request, response) => {
  console.log(request.body.name);
  const food = new foodModel();
    food.name = request.body.name
    food.email = request.body.email
    food.message = request.body.message
  try {
    await food.save();
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/foodupdate", async (request, response) => {
  console.log(request.body.name);
  const food = new foodModel();
    food.name = request.body.name
    food.email = request.body.email
    food.message = request.body.message
    let data={
      name:request.body.name,
      email:request.body.email,
      message:request.body.message
    }
  try {
    const articles = await foodModel.findByIdAndUpdate(request.body.id, {  name:request.body.name,
      email:request.body.email,
      message:request.body.message})
    response.send(articles);
    console.log(articles);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/fooddelete", async (request, response) => {
  console.log(request.body.id);
  try {
    const articles = await foodModel.findByIdAndDelete(request.body.id);
    response.send(articles);
    console.log(articles);
  } catch (err) {
    console.log(err);
  }


});
app.get("/foodi/:id", async (request, response) => {
  console.log(request.params.id)
  try {
   const food= await foodModel.findById(request.params.id);
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.post("/add", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
    console.log(req.body.num1)
  var result = num1 + num2 ;
    
  res.send("Addition - " + result);
});


const path = require('path');
const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/', 'uploads'),
  filename: function (req, file, cb) {   
      // null as first argument means no error
      cb(null, Date.now() + '-' + file.originalname )  
  }
})

app.post('/imageupload', async (req, res) => {	
  try {
      // 'avatar' is the name of our file input field in the HTML form

      let upload = multer({ storage: storage}).single('avatar');

      upload(req, res, function(err) {
          // req.file contains information of uploaded file
          // req.body contains information of text fields

          if (!req.file) {
              return res.send('Please select an image to upload');
          }
          else if (err instanceof multer.MulterError) {
              return res.send(err);
          }
          else if (err) {
              return res.send(err);
          }

          const classifiedsadd = {
      image: req.file.filename
    };
    console.log(classifiedsadd)
      res.json({ success: 1 })       
      }); 
  }catch (err) {console.log(err)}
})


module.exports=route;