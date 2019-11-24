const express = require("express");
const Router = express.Router();
const fs = require("fs");
const {
    sampleRead,
    asyncReadData,
    sampleUpdate
} = require("../controllers/dataController");

Router.get("/", async(req, res) => {
    let data = await asyncReadData();
    res.render("homePage", {
        questionContent: data[Math.floor(Math.random() * data.length)].questionContent
    });
});

Router.post("/yes", (req, res) => {
    let id = req.params.id;
    sampleUpdate(id, "yes");
    res.render("answer");
});

Router.post("/no", async(req, res) => {
    let id = req.body.id;
    await sampleUpdate(id, "no");
    res.render("answer");
});

module.exports = Router;