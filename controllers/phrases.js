const { _askQuestion, _boxAnswer } = require("../modules/phrases.js");
const casual = require("casual");
const bodyParser = require("body-parser");

let wordArray = [];
let replyArray = [];
let currentBoxAnswer;
let finalAnswer;

const whFun = async (type) => {
  await boxAnswer(type);
  secondWord(wordArray[1]);
  if (currentBoxAnswer.type == "general") {
    finalAnswer = currentBoxAnswer.response;
    console.log(finalAnswer);
    return finalAnswer;
  } else {
    finalAnswer = `${replyArray.join(" ")} ${currentBoxAnswer.response}`;
    console.log(finalAnswer);
    return finalAnswer;
  }
};

const splitSentence = (sent) => {
  wordArray = sent.split(" ");
  wordArray[wordArray.length - 1] = wordArray[wordArray.length - 1].replace(
    "?",
    ""
  );
  console.log(wordArray);
  firstWord(wordArray[0]);
};

const firstWord = (word) => {
  switch (word) {
    case "who":
      whFun("who");
      break;
    case "what":
      whFun("what");
      break;
    case "where":
      whFun("where");
      break;
    case "when":
      whFun("when");
      break;
    case "why":
      whFun("why");
      break;
    case "how":
      whFun("how");
      break;
  }
};

const secondWord = (word) => {
  thirdWord(wordArray[2]);
  switch (word) {
    case "is":
      // thirdWord(wordArray[2]);
      replyArray.push("is");
      break;
    case "are":
      // thirdWord(wordArray[2]);
      replyArray.push("are");
      break;
    case "do":
      // thirdWord(wordArray[2]);
      break;
    case "am":
      // thirdWord(wordArray[2]);
      replyArray.push("are");
      break;
    default:
      // thirdWord(wordArray[2]);
      replyArray.splice(1, word);
  }
};

const thirdWord = (word) => {
  switch (word) {
    case "my":
      replyArray = wordArray.slice(3, wordArray.length);
      replyArray.unshift("your");
      break;
    case "your":
      replyArray = wordArray.slice(3, wordArray.length);
      replyArray.unshift("my");
      break;
    case "the":
      replyArray = wordArray.slice(2, wordArray.length);
      break;
    case "I":
      replyArray = ["you"];
      break;
    default:
      replyArray = wordArray.slice(3, wordArray.length);
      replyArray.unshift(word);
  }
};

const boxAnswer = async (type) => {
  try {
    result = await _boxAnswer(type);
    let allAnswers = result;
    let index = Math.floor(Math.abs(Math.random() * (allAnswers.length - 1)));
    currentBoxAnswer = allAnswers[index];
    console.log(index);
  } catch (error) {
    console.log(error);
  }
};

// const boxAnswer = (type) => {
//   _boxAnswer(type)
//     .then((result) => {
//       let allAnswers = result;
//       let index = Math.floor(Math.abs(Math.random() * (allAnswers.length - 1)));
//       currentBoxAnswer = allAnswers[index];
//       console.log(currentBoxAnswer);
//       // res.json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).json({ msg: "not found" });
//     });
// };

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
