const { _askQuestion, _boxAnswer } = require("../modules/phrases.js");
const casual = require("casual");
const bodyParser = require("body-parser");
// const {
// _getAllProduct,
// _getProduct,
// _askQuestion,
// _createProduct,
// _updateProduct,
// _deleteProduct,
// } = require("../modules/products.js");

let wordArray = [];

const splitSentence = (sent) => {
  wordArray = sent.split(" ");
  console.log(wordArray);
  switch (wordArray[0]) {
    case "who":
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

// module.exports = {
//     getProducts,
//     getProduct,
//     // getProduct,
//     askQuestion,
//     createProduct,
//     updateProduct,
//     deleteProduct,
//   };
module.exports = { askQuestion };
