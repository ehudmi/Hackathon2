const { _askQuestion, _boxAnswer } = require("../modules/phrases.js");
const casual = require("casual");
const bodyParser = require("body-parser");

let wordArray = [];
let replyArray = [];
let currentBoxAnswer;

const splitSentence = (sent) => {
  wordArray = sent.split(" ");
  console.log(wordArray);
  firstWord(wordArray[0]);
};

const firstWord = (word) => {
  switch (word) {
    case "who":
      secondWord(wordArray[1]);
      boxAnswer("who");
      console.log(replyArray, currentBoxAnswer);
      break;
    case "what":
      break;
    case "where":
      break;
    case "when":
      break;
    case "why":
      break;
    case "how":
      break;
  }
};

const secondWord = (word) => {
  switch (word) {
    case "is":
      thirdWord(wordArray[2]);
      replyArray.push("is");
      break;
    case "are":
      thirdWord(wordArray[2]);
      replyArray.push("are");
      break;
    case "do":
      thirdWord(wordArray[2]);
      break;
  }
};

const thirdWord = (word) => {
  switch (word) {
    case "my":
      replyArray = wordArray.slice(3, wordArray.length - 1);
      replyArray.unshift("your");
      break;
    case "your":
      replyArray = wordArray.slice(3, wordArray.length - 1);
      replyArray.unshift("my");
      break;
    case "the":
      replyArray = wordArray.slice(2, wordArray.length - 1);
      break;
  }
};

const boxAnswer = (type) => {
  _boxAnswer(type)
    .then((result) => {
      let allAnswers = result;
      let index = Math.floor(Math.abs(Math.random() * (allAnswers.length - 1)));
      currentBoxAnswer = allAnswers[index];
      console.log(currentBoxAnswer);
      // res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "not found" });
    });
};

const askQuestion = (req, res) => {
  console.log(req.body.text);
  _askQuestion(req.body.text)
    .then((result) => {
      if (result.length > 0) {
        console.log(result);
        console.log(result[0].answer);
        res.send(result[0].answer);
      } else {
        console.log("this is foobar");
        splitSentence(req.body.text);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ msg: "not found" });
    });
};

module.exports = { askQuestion };
