const Pool = require("../database/connection");

module.exports = {

    getBudget: async (req, res) => {
        try {
            const { id } = req.params;

            /**
             * check if budget exists for the given month and year
             */
            const { rows } = await Pool.query(
                "SELECT * FROM budget WHERE id = $1",
                [id]
            );

            /**
             * if budget does not exist, return 404
             * else return the budget
             */

            if (rows.length === 0) {
                res.status(404).json({ message: "Estimated budget not found, please set a budget for this month" });
            } else {
                res.status(200).json(rows[0]);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    setBudget: async (req, res) => {
        try {
            const { id } = req.params;
            const { estimated_budget } = req.body;
            const month = id.slice(0, 2);
            const year = id.slice(2, 6);

            /**
             * check if budget already exists for the given month and year before trying to insert
             * if it does, update instead else insert
             */
            const checkAvailability = await Pool.query(
                "SELECT * FROM budget WHERE id = $1",
                [id]
            );

            if (checkAvailability.rows.length > 0) {
                const { rows } = await Pool.query(
                    "UPDATE budget SET estimated_budget = $1 WHERE id = $2 RETURNING *",
                    [estimated_budget, id]
                );

                return res.status(200).json({ message: "Budget successfully updated", budget: rows[0] });
            }

            /**
             * insert budget into database if it does not exist
             */

            const { rows } = await Pool.query(
                "INSERT INTO budget (id, month, year, estimated_budget, timestamp) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [id, month, year, estimated_budget, new Date()]
            );

            return res.status(201).json({ message: "Budget successfully set", budget: rows[0] });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

};
