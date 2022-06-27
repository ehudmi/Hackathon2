const db = require("../connections/connect-heroku-db.js");

const _askQuestion = (ques) => {
  console.log(ques);
  return db("goodfit_tab").select("answer").where({ question: ques });
};

const _boxAnswer = (type) => {
  return db("box_tab")
    .select("type", "response")
    .where({ type: type })
    .orWhere({ type: "general" });
};

module.exports = { _askQuestion, _boxAnswer };
