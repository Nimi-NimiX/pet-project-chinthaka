const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Transaction extends Model {
  static associate(models) {
    this.belongsTo(models.Budget, {
      foreignKey: 'budgetId',
      targetKey: 'id',
    });

    this.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id',
    });
  }
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'transaction',
    underscored: true,
  }
);

module.exports = Transaction;
