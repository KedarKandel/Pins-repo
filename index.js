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

if (process.env.NODE_ENV === "production") {
    app.use('frontend/public', express.static(path.join(__dirname, '/')));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/public", "index.html"));
  });
}
// app.use(express.static('./client/dist/'));
// app.use(express.static(path.join(__dirname, "/frontend/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
// });

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
