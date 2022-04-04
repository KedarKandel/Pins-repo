const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo db connected");
  })
  .catch((err) => console.log(err));

app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

// server static assets if in production

if(process.env.NODE_ENV ==="prduction"){
  app.use(express.static("frontend/build"));
  
}


app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});

// "frontend-install": "npm install --prefix frontend",
//     "frontend": "npm start --prefix frontend",
//     "start": "node index.js",
//     "dev": "concurrently \"npm run server\" \"npm run frontend\"",
//     "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix frontend && npm run build --prefix frontend"