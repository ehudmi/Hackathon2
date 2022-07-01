const express = require("express");
const { askQuestion, newGoodFit } = require("../controllers/phrases.js");

const router = express.Router();

router.post("/", askQuestion);
router.put("/", newGoodFit);

module.exports = router;
