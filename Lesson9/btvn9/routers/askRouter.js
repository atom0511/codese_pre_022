const express = require("express");
const Router = express.Router();
const fs = require("fs");
const { sampleCreate } = require("../controllers/dataController");

Router.get("/ask", (req, res) => {
    res.render("ask");
});

Router.post("/ask", (req, res) => {
    let questionContent = req.body.questionContent;
    sampleCreate(questionContent);
    res.render("ask");
});
module.exports = Router;