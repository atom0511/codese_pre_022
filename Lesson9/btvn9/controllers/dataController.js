const QuestionModel = require("../models/dataSchema");

let createData = questionContent => {
    let newQuestion = QuestionModel({
        questionContent: questionContent,
        questionAnswer: []
    });
    newQuestion.save().then(
        value => {
            console.log(value);
        },
        fail => {
            console.log("oke");
        }
    );
};

let readData = callback => {
    QuestionModel.find({}, (err, data) => {
        if (err) {
            console.log(err);
            callback({
                questionContent: "Đ có câu hỏi"
            });
        } else {
            console.log(data);
            callback(data);
        }
    });
};

let updateAnswer = async function(id, newAnswer) {
    await QuestionModel.findById({ _id: id }, (err, data) => {
        console.log(data);
        data.questionAnswer.push(newAnswer);
    });
};

let deleteData = id => {
    QuestionModel.deleteOne({ _id: id }, err => {
        console.log(err ? "Loi delete" : "Xoa thanh cong");
    });
};

async function asyncReadData() {
    let data = await QuestionModel.find({});
    return data;
}

// function update(id, answer) {
//     QuestionModel.findById(id, (err, data) => {
//         data.questionAnswer.push(answer);
//         QuestionModel.updateOne({}, data);
//     });
// }

module.exports = {
    sampleCreate: createData,
    sampleRead: readData,
    sampleUpdate: updateAnswer,
    sampleDelete: deleteData,
    asyncReadData: asyncReadData
};