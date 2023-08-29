const Category = require("../models/categoryModel");

module.exports = {
  addCategory: async (req, res) => {
    try {
      const { name } = req.body;

      /**
       * Check if category already exists in database
       */

      const category = await Category.findOne({ where: { name } });

      if (category) {
        return res.status(400).json({ message: "Category already exists" });
      }

      /**
       * If category does not exist, create a new category
       */

      const data = await Category.create({ name });

      res.status(201).json({ category: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getCategories: async (req, res) => {
    try {
      /**
       * Return all categories from database
       */

      const data = await Category.findAll();

      res.status(200).json({ categories: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
