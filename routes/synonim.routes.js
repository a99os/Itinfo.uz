const { Router } = require("express");
const router = Router();
const {
  addSynonim,
  getSynonims,
  getSynonimById,
  updateSynonim,
  deleteSynonim,
} = require("../controllers/synonim.controller");
router.get = ("/", getSynonims);
router.get = ("/:id", getSynonimById);
router.post = ("/", addSynonim);
router.put = ("/:id", updateSynonim);
router.delete = ("/:id", deleteSynonim);

module.exports = router;
