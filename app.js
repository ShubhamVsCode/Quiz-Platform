require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoute = require("./router/auth.route");
const quizRoute = require("./router/quiz.route");
const optionRoute = require("./router/option.route");
const questionRoute = require("./router/question.route");

const app = express();

const PORT = process.env.PORT || 5050;
mongoose.set("strictQuery", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => res.json({ msg: "Hello world!" }));
app.use("/api/auth", authRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/option", optionRoute);
app.use("/api/question", questionRoute);

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
