const { Router } = require("express");
const {
  getSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
  addSocial,
} = require("../controllers/social.controller");

const router = Router();

router.get("/", getSocials);
router.get("/:id", getSocialById);
router.post("/", addSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);

module.exports = router;
