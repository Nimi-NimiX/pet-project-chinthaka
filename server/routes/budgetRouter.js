const router = require('express').Router();

const { getBudget, setBudget } = require('../controllers/budgetController');

router.get('/:id', getBudget);

router.post('/:id', setBudget);

module.exports = router;