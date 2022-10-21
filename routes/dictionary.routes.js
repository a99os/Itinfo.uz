const { Router } = require("express");
const {
  addTerm,
  getTerms,
  getTermsByLetter,
  getTermsById,
  updateTerm,
  deleteTerm,
} = require("../controllers/dictionary.controller");
const router = Router();

router.get("/", getTerms);
router.get("/id/:id", getTermsById);
router.get("/:letter", getTermsByLetter);
router.post("/", addTerm);
router.put("/id/:id", updateTerm);
router.delete("/id/:id", deleteTerm);
module.exports = router;
