const router = require('express').Router();

const { addCategory, getCategories } = require('../controllers/categoryController');

router.get('/', getCategories);

router.post('/', addCategory);

module.exports = router;