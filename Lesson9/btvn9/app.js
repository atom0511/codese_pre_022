const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    fs.exists("data.json", exists => {
        if (exists) {
            let data = fs.readFileSync("data.json", "utf8");
            let obj = JSON.parse(data);
            let questionContent = obj[Math.floor(Math.random() * obj.length)];
            res.render("homePage", {
                questionContent: questionContent.questionContent
            });
        } else {
            res.render("homePage", {
                questionContent: "Hiện chưa có câu hỏi nào!!!"
            });
        }
    });
});

app.get("/homePage", (req, res) => {
    res.render("homePage");
});

app.post("/homePage", (req, res) => {
    let as = req.body.yesAS;
    console.log(as);
});

app.get("/ask", (req, res) => {
    res.render("ask");
});

app.post("/ask", (req, res) => {
    let questionContent = req.body.questionContent;
    console.log(questionContent);
    let data;
    try {
        let rawData = fs.readFileSync("data.json", "utf8");
        data = JSON.parse(rawData);
    } catch (error) {
        data = [];
    } finally {
        let newQuestion = {
            id: data.length,
            questionContent: questionContent,
            questionAnswers: []
        };
        data.push(newQuestion);
        let savedData = JSON.stringify(data);
        fs.writeFile("data.json", savedData, err => {
            if (err) {
                console.log(err);
            } else {
                res.render("ask");
            }
        });
    }
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