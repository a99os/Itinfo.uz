const { Router } = require("express");
const router = Router();
const {
  addAS,
  getASs,
  getASById,
  updateAS,
  deleteAS,
} = require("../controllers/author_social.controller");
router.get = ("/", getASs);
router.get = ("/:id", getASById);
router.post = ("/", addAS);
router.put = ("/:id", updateAS);
router.delete = ("/:id", deleteAS);

module.exports = router;
