const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
const dataSchema = require("./models/dataSchema");

mongoose.connect("mongodb://localhost/demo", { useNewUrlParser: true }, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected");
    }
});

let app = express();
const homeRouter = require("./routers/homeRouter");
const askRouter = require("./routers/askRouter");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/", homeRouter);
app.use("/", askRouter);

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/homePage", (req, res) => {
    res.render("homePage");
});

app.post("/homePage", (req, res) => {
    let as = req.body.yesAS;
    console.log(as);
    let data = fs.readFileSync("data.json", "utf8");
    let obj = JSON.parse(data);
    let questionContent = obj[Math.floor(Math.random() * obj.length)];
    res.render("answer", { questionContent: questionContent.questionContent });
});

app.get("/answer", (req, res) => {
    fs.exists("data.json", exists => {
        if (exists) {
            let data = fs.readFileSync("data.json", "utf8");
            let obj = JSON.parse(data);
            let questionContent = obj[Math.floor(Math.random() * obj.length)];
            res.render("answer", {
                questionContent: "Câu hỏi của bạn: " + questionContent.questionContent
            });
        } else {
            res.render("answer", {
                questionContent: "Hiện chưa có câu hỏi nào!!!"
            });
        }
    });
});

app.listen(6061, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("App listen to 6061");
    }
});