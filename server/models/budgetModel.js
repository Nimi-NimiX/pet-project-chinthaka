const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');

class Budget extends Model {
  static associate(models) {
    this.hasMany(models.Transaction, {
      foreignKey: 'budgetId',
      sourceKey: 'id',
    });
  }
}

Budget.init(
  {
    id: {
      type: DataTypes.STRING,
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
    estimatedBudget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'budget',
    underscored: true,
  }
);

module.exports = Budget;
