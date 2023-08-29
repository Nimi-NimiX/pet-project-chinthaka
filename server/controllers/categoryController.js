const Pool = require("../database/connection");

module.exports = {

    addCategory: async (req, res) => {
        try {

            const { name } = req.body;

            /**
             * Trying to insert category into database and return the inserted category
             */
            const { rows } = await Pool.query(
                "INSERT INTO category (category_name) VALUES ($1) RETURNING *",
                [name]
            );

            if (rows.length === 0) {
                res.status(500).json({ message: "Internal server error" });
            }

            res.status(200).json({ message: "Category successfully added", category: rows[0] });

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
            const { rows } = await Pool.query(
                "SELECT * FROM category"
            );

            if (rows.length === 0) {
                res.status(404).json({ message: "No categories found" });
            }

            res.status(200).json({ categories: rows });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

};