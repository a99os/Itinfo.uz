const { Router } = require("express");
const router = Router();
const {
  addSocial,
  getSocials,
  getSocialById,
  updateSocial,
  deleteSocial,
} = require("../controllers/author.controller");
router.get = ("/", getSocials);
router.get = ("/:id", getSocialById);
router.post = ("/", addSocial);
router.put = ("/:id", updateSocial);
router.delete = ("/:id", deleteSocial);

module.exports = router;
