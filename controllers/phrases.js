const { _askQuestion } = require("../modules/phrases.js");
// const {
// _getAllProduct,
// _getProduct,
// _askQuestion,
// _createProduct,
// _updateProduct,
// _deleteProduct,
// } = require("../modules/products.js");

const askQuestion = (req, res) => {
  console.log(req.body.text);
  _askQuestion(req.body.text)
    .then((result) => {
      console.log(result);
      res.send(result);
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
