const {
  _askQuestion,
  _boxAnswer,
  _newGoodFit,
} = require("../modules/phrases.js");
const casual = require("casual");

// Global variables that I think I need
let wordArray = [];
let replyArray = [];
let currentBoxAnswer;
let finalAnswer;

// if there is no goodfit answer
const splitSentence = (sent) => {
  wordArray = sent.split(" ");
  wordArray[wordArray.length - 1] = wordArray[wordArray.length - 1].replace(
    "?",
    ""
  );
  firstWord(wordArray[0]);
};

// Examine the first word of the question
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

// handling of the wh question logic
const whFun = async (type) => {
  secondWord(wordArray[1]);
  await boxAnswer(type);
  const assessBoxAnswer = () => {
    if (currentBoxAnswer.type == "general") {
      finalAnswer = currentBoxAnswer.response;
      return finalAnswer;
    } else {
      finalAnswer = `${replyArray.join(" ")} ${currentBoxAnswer.response}`;
      return finalAnswer;
    }
  };
  let flip = casual.integer((from = 1), (to = 4));
  if (flip > 1) {
    assessBoxAnswer();
  } else {
    switch (type) {
      case "who":
        finalAnswer = `${replyArray.join(" ")} ${casual.full_name}`;
        break;
      case "where":
        finalAnswer = `${replyArray.join(" ")} in ${casual.city}, ${
          casual.country
        }`;
        break;
      case "when":
        finalAnswer = `${replyArray.join(" ")} on ${casual.month_name} ${
          casual.day_of_month
        }, ${casual.year}`;
        break;
      default:
        assessBoxAnswer();
        break;
    }
  }
};

// examine 2nd word
const secondWord = (word) => {
  thirdWord(wordArray[2]);
  switch (word) {
    case "is":
      replyArray.push("is");
      break;
    case "are":
      replyArray.push("are");
      break;
    case "do":
      break;
    case "am":
      replyArray.push("are");
      break;
    default:
      replyArray.splice(1, word);
  }
};

// examine 3rd word
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

// request a box answer and randomize it
const boxAnswer = async (type) => {
  try {
    result = await _boxAnswer(type);
    let allAnswers = result;
    let index = casual.integer((from = 0), (to = allAnswers.length - 1));
    currentBoxAnswer = allAnswers[index];
  } catch (error) {
    console.log(error);
  }
};

// receive the question and check to see if there is a goodfit answer - if not start the logic
const askQuestion = async (req, res) => {
  try {
    let result = await _askQuestion(req.body.question);
    if (result.length > 0) {
      res.send(result[0].answer + "9");
    } else {
      const res1 = splitSentence(req.body.question);
      if (finalAnswer) {
        res.send(finalAnswer);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "not found" });
  }
};

// receive the high rating from the user and add answer to goodfit table
const newGoodFit = async (req, res) => {
  try {
    let result = await _newGoodFit(req.body);
    res.send("Glad you approve - you know what - I'll write this down");
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "I failed" });
  }
};

module.exports = { askQuestion, newGoodFit };
