const Category = require('../models/category');

const categoryController = {
  getCategories: async (req, res) => {
    try {
      /**
       * Return all categories from database
       */

      const data = await Category.findAll();

      res.status(200).json({ categories: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = categoryController;
