const router = require('express').Router();

const { getBudget, setBudget } = require('../controllers/budgetController');

router.get('/', getBudget);

router.post('/', setBudget);

module.exports = router;