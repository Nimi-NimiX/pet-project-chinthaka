const Pool = require("../database/connection");

module.exports = {
    getTransactions: async (req, res) => {
        try {
            /**
             * 1. Get the budget id from the budget table
             * 2. Get the transactions from the transactions table using the budget id
             * 3. Return the transactions
             */

            const { budgetId } = req.body;

            const { transactions } = await Pool.query(
                "SELECT * FROM transaction WHERE budget_id = $1",
                [budgetId]
            );

            if (transactions.length === 0) {
                return res.status(404).json({ message: "No transactions found" });
            }

            return res.status(200).json({ transactions });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    addTransaction: async (req, res) => {
        try {
            const { budgetId, amount, remakrs, type, categoryId } = req.body;

            const { checkAvailability } = await Pool.query(
                "SELECT * FROM budget WHERE id = $1",
                [budgetId]
            );

            if (checkAvailability.length === 0) {
                /**
                 * if budget does not exist, create a new budget with the 0 estimated budget
                 * this is to prevent the user from adding transactions without setting up a budget first
                 */
                const month = budgetId.slice(0, 2);
                const year = budgetId.slice(2, 6);
                const estimated_budget = 0;
                await Pool.query(
                    "INSERT INTO budget (id, month, year, estimated_budget) VALUES ($1, $2, $3) RETURNING *",
                    [budgetId, month, year, estimated_budget]
                );
            }

            const { rows } = await Pool.query(
                "INSERT INTO transaction (budget_id, category_id, amount, remakrs, type, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [budgetId, categoryId, amount, remakrs, type, new Date()]
            );

            if (rows.length === 0) {
                return res.status(500).json({ message: "Internal Server Error" });
            }

            return res.status(200).json({
                message: "Transaction added successfully",
                transaction: rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    updateTransaction: async (req, res) => {
        try {
            const { id, amount, remakrs, categoryId } = req.body;

            const { rows } = await Pool.query(
                "UPDATE transactions SET category_id = $1, amount = $2, remakrs = $3, WHERE id = $4 RETURNING *",
                [categoryId, amount, remakrs, id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Transaction not found" });
            }

            return res.status(200).json({
                message: "Transaction updated successfully",
                transaction: rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const { id } = req.body;

            const { rows } = await Pool.query(
                "DELETE FROM transactions WHERE id = $1 RETURNING *",
                [id]
            );

            if (rows.length === 0) {
                return res.status(404).json({ message: "Transaction not found" });
            }

            return res
                .status(200)
                .json({ message: "Transaction deleted successfully" });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },
};
