const mongoose = require("mongoose")
const express = require("express")
const app = express();
const { Configuration, OpenAIApi } = require("openai");
const readlineSync = require("readline-sync");
const apis = "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";

// (async () => {
//   const configuration = new Configuration({
//     apiKey: apis,
//   });
//   const openai = new OpenAIApi(configuration);

//   const history = [];

//   while (true) {
//     const user_input = readlineSync.question("Your input: ");

//     const messages = [];
//     for (const [input_text, completion_text] of history) {
//       messages.push({ role: "user", content: input_text });
//       messages.push({ role: "assistant", content: completion_text });
//     }

//     messages.push({ role: "user", content: user_input });

//     try {
//       const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: messages,
//       });

//       const completion_text = completion.data.choices[0].message.content;
//       console.log(completion_text);

//       history.push([user_input, completion_text]);

//       const user_input_again = readlineSync.question(
//         "\nWould you like to continue the conversation? (Y/N)"
//       );
//       if (user_input_again.toUpperCase() === "N") {
//         return;
//       } else if (user_input_again.toUpperCase() !== "Y") {
//         console.log("Invalid input. Please enter 'Y' or 'N'.");
//         return;
//       }
//     } catch (error) {
//       if (error.response) {
//         console.log(error.response.status);
//         console.log(error.response.data);
//       } else {
//         console.log(error.message);
//       }
//     }
//   }
// })();
require('dotenv').config();
const route = express.Router();
const foodModel = require("./channel");
const userModel = require("./imgchannel");
const PORT = 3000;
const multer = require('multer');
const dbUrl=process.env.MONGO_URI 
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Body parser use JSON data
const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
require("chromedriver");

// const mysql = require('mysql');
// const conn = mysql.createConnection({
//     // host:'localhost',
//     // database:'blog_react',
//     // user: 'root',
//     // password:'password'
//     host:'166.62.28.130',
//     database:'testdbs',
//     user: 'taskdb',
//     password:'taskdb123@' 
// })

// conn.connect(function(error){
//     if(error){
//         throw error;
//     }
//     else{
//         console.log('Success');
//     }
// });

// app.get('/data',(req,res)=>{
//     const sql = 'SELECT * FROM blog_data';
//     conn.query(sql,(error,results)=>{
//         res.send(results);
//        // console.log(results);
//      });

//      let ress =  api.sendMessage('What is OpenAI?')
//      console.log(ress.text)
// });
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
app.get("/", async (request, response) => {
      response.status(500).send("suhail");
});
app.get("/foods", async (request, response) => {
    const foods = await foodModel.find({});
  
    try {
      console.log(foods.length)
      response.send(foods);
    } catch (error) {
      response.status(500).send(error);
    }
  });
  app.get("/sels/:name", async (request, response) => {
    var name = request.params.name;
    console.log(request.params.name)});
  app.get("/sel/:name", async (request, response) => {
    var name = request.params.name;
    console.log(request.params.name)
    // async function example() {
    //   let driver = await new Builder().forBrowser(Browser.CHROME).build();
    //   try {
    //     await driver.get('https://www.google.com/');
    //     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    //     await driver.wait(until.titleIs('webdriver - Google Search'), 10000);
    //   } finally {
    //     await driver.quit();
    //   }
    // }
    // example();
    let suhail="";
    let c=0;
    var arr3 = [ 'Content-Marketing-Impact-On-Digital-Marketing-:-Is-Not-That-Difficult-As-You-Think','Google-Still-Rolling-Out-its-Mobile-First-Indexing'
  ,'Google-analytics-:-New-Update-on-Data-Retention-Control'
  ];
   for(var i=0;i<3; await i++){
      console.log(i)
     
      setTimeout( async function examples(i) {
      let driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://www.smartladders.com/blog/'+arr3[i]);
        var names =await driver.findElements(By.className("category"));
      console.log("before"+names);
        for(let n of names){
          console.log("suhail"+i+await n.getText());
          suhail = "Title:"+arr3[i]+"   " +"Category:"+ await n.getText();
        } 
        var fs = require("fs");
        fs.appendFile("temp.txt", suhail+"\r\n", (err) => {
          if (err) console.log(err);
          console.log("Successfully Written to File.");
        });
        suhail="";
        console.log( await "after"+suhail);
       // await driver.wait(until.titleIs('chatgpt - Google Search'), 10000);
     // } finally {
        await driver.quit();
        c++;
     // }
     if(c==3){
      fs.readFile('temp.txt', 'utf8', function(err, data) {
       response.send(data);
      });
     }
    },10000 * i, i);

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
  var fs = require("fs");
var data = "New File Contents";
fs.writeFile("temp.txt", data, (err) => {
  if (err) console.log(err);
  console.log("Successfully Written to File.");
});
});
app.post("/add", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
    console.log(req.body.num1)
  var result = num1 + num2 ;
    
  res.send("Addition - " + result);
});


const path = require('path');
// const storage = multer.diskStorage({
//   destination: path.join(__dirname, './public/', 'uploads'),
//   filename: function (req, file, cb) {   
//       // null as first argument means no error
//       cb(null, Date.now() + '-' + file.originalname )  
//   }
// })

// app.post('/imageupload', async (req, res) => {	
//   try {
//       // 'avatar' is the name of our file input field in the HTML form

//       let upload = multer({ storage: storage}).single('avatar');

//       upload(req, res, function(err) {
//           // req.file contains information of uploaded file
//           // req.body contains information of text fields

//           if (!req.file) {
//               return res.send('Please select an image to upload');
//           }
//           else if (err instanceof multer.MulterError) {
//               return res.send(err);
//           }
//           else if (err) {
//               return res.send(err);
//           }

//           const classifiedsadd = {
//       image: req.file.filename
//     };
//     console.log(classifiedsadd)
//       res.json({ success: 1 })       
//       }); 
//   }catch (err) {console.log(err)}
// })
const fs = require("fs");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.post("/img", upload.single("photo"), (req, res) => {
  const saveImage =  userModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    }
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});


app.get('/img',async (req,res)=>{
  const allData = await userModel.find()
  res.json(allData)
})
module.exports=route;