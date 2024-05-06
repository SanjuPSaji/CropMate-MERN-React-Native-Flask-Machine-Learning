const { connectDB } = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const dataRoute = require("./Routes/DataRoute");
const cropRoute = require("./Routes/CropRoute");
const postRoute = require("./Routes/PostRoute");
const commentRoute = require("./Routes/CommentRoute");
const { PORT } = process.env;


const app = express();

connectDB();
console.log();
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    //CORS (Cross origin resource sharing): You can allow requests from other domains to access the resources on your server by using the cors() express middleware function. 
    origin: ["http://localhost:4000", "http://localhost:5173", "https://cropmate.onrender.com", "https://crop-mate-33nf5j7jj-sanjus-projects.vercel.app" , "https://crop-mate.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());  
//express.json(): The express.json() will add a body property to the request or req object. This includes the request body's parsed JSON data. req.body in your route handler function will allow you to access this data

app.use("/", authRoute);
app.use("/", dataRoute);
app.use("/", cropRoute);
app.use("/", postRoute);
app.use("/", commentRoute);