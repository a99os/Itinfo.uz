const { Router } = require("express");
const router = Router();
const {
  addMedia,
  getMedias,
  getMediaById,
  updateMedia,
  deleteMedia,
} = require("../controllers/media.controller");
router.get = ("/", getMedias);
router.get = ("/:id", getMediaById);
router.post = ("/", addMedia);
router.put = ("/:id", updateMedia);
router.delete = ("/:id", deleteMedia);

module.exports = router;
