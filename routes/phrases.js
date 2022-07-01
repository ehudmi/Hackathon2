const express = require("express");
const { askQuestion, newGoodFit } = require("../controllers/phrases.js");
// const {
// getProducts,
// getProduct,
// searchProduct,
// askQuestion,
// updateProduct,
// deleteProduct,
// } = require("../controllers/phrases.js");

const router = express.Router();

// router.get("/search", searchProduct);
// router.get("/:id", getProduct);
// router.get("/", getProducts);
router.post("/api/phrases", askQuestion);
router.put("/api/phrases", newGoodFit);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

module.exports = router;
