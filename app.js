require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const quizModel = require("./model/quiz.model");
const authRoute = require("./router/auth.route");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = process.env.PORT || 5050;
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.json({ msg: "Hello world!" }));
app.use("/api/auth/", authRoute);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB CONNECTED");

    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    const onListening = () => {
      console.log(`Listening on ${PORT}`);
    };

    app.listen(PORT, onListening);
  } catch (err) {
    console.log("ERROR ", err);
    // throw err;
  }
})();
