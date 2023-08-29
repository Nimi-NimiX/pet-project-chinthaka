const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Budget = sequelize.define(
  "budget",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estimated_budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "budgets",
  }
);

module.exports = Budget;
