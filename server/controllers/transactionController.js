const Transaction = require("../models/transactionModel");
const Budget = require("../models/budgetModel");
const Category = require("../models/categoryModel");

module.exports = {
  getTransactions: async (req, res) => {
    try {
      const { budgetId } = req.body;

      const data = await Transaction.findAll({
        where: {
          budgetId,
        },
        include: [
          {
            model: Category,
          },
        ],
      });

      return res.status(200).json({ transactions: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addTransaction: async (req, res) => {
    try {
      const { budgetId, amount, remakrs, type, categoryId, date } = req.body;

      const budget = await Budget.findByPk(budgetId);

      /**
       * If budget is not found, create a new budget with the given id
       * This is to make sure that the budget exists before adding a transaction
       */
      if (!budget) {
        const year = budgetId.substring(budgetId.length - 4);
        const month = budgetId.substring(0, budgetId.length - 4);

        await Budget.create({ id: budgetId, year, month, estimated_budget: 0 });
      }

      const data = await Transaction.create({
        budgetId,
        amount,
        remakrs,
        type,
        categoryId,
        date,
      });

      return res.status(201).json({ transaction: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, remakrs, categoryId } = req.body;

      const data = await Transaction.update(
        {
          amount,
          remakrs,
          categoryId,
        },
        { where: { id } }
      );

      return res.status(200).json({ transaction: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteTransaction: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Transaction.destroy({ where: { id } });

      return res.status(200).json({ transaction: data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
