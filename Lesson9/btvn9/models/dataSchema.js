const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionContent: { type: String },
    questionAnswers: []
}, {
    _id: true,
    timestamps: true
});

let Question = mongoose.model("questions", questionSchema);

module.exports = Question;