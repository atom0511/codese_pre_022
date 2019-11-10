const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const fs = require("fs");

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(6061, err => {
    if (err) {
        console.log(err);
    } else {
        console.log("App listen at 6061");
    }
});

app.get("/", (req, res) => {
    res.render("bodyMain");
});

app.post("/", (req, res) => {
    let box1 = req.body.leftBox1;
    let box2 = box1 * 10;
    res.render("bodyMain", { leftBox1: box1, rightBox1: box2 });
    let value1 = req.body.donvi1;
    console.log("vl1 = ", value1);
    let value2 = req.body.donvi2;
    console.log("vl2 = ", value2);
});