const budget = require("../models/budgetModel");
const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");

const budgetController = {
  getBudget: async (req, res) => {
    try {
      const { id } = req.params;
      const { month, year } = req.body;

      /**
       * Find budget by id and include all transactions and their categories
       */
      const data = await budget.findByPk(id, {
        include: [
          {
            model: Transaction,
            include: [
              {
                model: Category,
              },
            ],
          },
        ],
      });

      /**
       * If budget is not found, create a new budget with the given id and return it
       * with estimated_budget = 0
       */
      if (!data) {
        await budget.create({
          id,
          month,
          year,
          estimated_budget: 0,
        });

        return res.status(200).json({
          budget: { id, month, year, estimated_budget: 0, transactions: [] },
        });
      }

      return res.status(200).json({ budget: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  setBudget: async (req, res) => {
    try {
      const { id } = req.params;
      const { estimated_budget, month, year } = req.body;

      const data = await budget.createOrUpdate({
        id,
        month,
        year,
        estimated_budget,
      });

      return res.status(200).json({ budget: data });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = budgetController;
