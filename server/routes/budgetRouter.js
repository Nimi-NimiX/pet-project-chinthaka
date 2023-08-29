const router = require("express").Router();

const extractMonth = require("../middleware/extractMonth");

const { getBudget, setBudget } = require("../controllers/budgetController");

router.get("/:id", extractMonth, getBudget);

router.post("/:id", extractMonth, setBudget);

module.exports = router;
