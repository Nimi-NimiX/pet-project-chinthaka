const sequelize = require("./sequelize");

/**
 * import all models
 */
const Budget = require("../models/budgetModel");
const Category = require("../models/categoryModel");
const Transaction = require("../models/transactionModel");

const connect = async () => {
  /**
   * define all associations
   */
  Budget.hasMany(Transaction);
  Transaction.belongsTo(Budget);
  Transaction.belongsTo(Category);

  /**
   * authenticate database connection
   */
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
};

module.exports = connect;
