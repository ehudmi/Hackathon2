const db = require("../connections/connect-heroku-db.js");

const _askQuestion = (ques) => {
  console.log(ques);
  return db("goodfit_tab").select("answer").where({ question: ques });
};

// module.exports = {
//     _getAllProduct,
//     _getProduct,
//     _searchProduct,
//     _createProduct,
//     _updateProduct,
//     _deleteProduct,
//   };
module.exports = { _askQuestion };
