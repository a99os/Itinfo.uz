const { Router } = require("express");
const router = Router();
const dictionaryRoutes = require("./dictionary.routes");
const categoryRoutes = require("./category.routes");
const descriptionRoutes = require("./description.routes");

router.use("/api/dictionary", dictionaryRoutes);
router.use("/api/category", categoryRoutes);
router.use("/api/description", descriptionRoutes);
module.exports = router;
