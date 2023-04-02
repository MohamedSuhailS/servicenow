const mongoose = require("mongoose")
const express = require("express")
const app = express();
require('dotenv').config();
const route = express.Router();
const foodModel = require("./channel");
const PORT = 3000;
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
app.get("/foodi", async (request, response) => {
  try {
   const food= await foodModel.findById("6422b2d1e74a330dc61b72b6");
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
module.exports=route;