const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/sequelize');
const Budget = require('./budgetModel');

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

// this hook will be called before creating a new transaction
Transaction.addHook('afterCreate', async (transaction) => {
  const budget = await Budget.findByPk(transaction.budgetId);

  if (transaction.type === 'income') {
    budget.income = budget.income + transaction.amount;
  } else if (transaction.type === 'expense') {
    budget.expense = budget.expense + transaction.amount;
  }

  budget.balance = budget.income - budget.expense;
  await budget.save();
});

// this hook will be called before updating a transaction
Transaction.addHook('afterUpdate', async (transaction) => {
  const budget = await Budget.findByPk(transaction.budgetId);

  // get the difference between the previous amount and the new amount
  const amountDifference =
    transaction.amount - transaction._previousDataValues.amount;

  if (transaction.type === 'income') {
    budget.income = budget.income + amountDifference;
  } else if (transaction.type === 'expense') {
    budget.expense = budget.expense + amountDifference;
  }

  budget.balance = budget.income - budget.expense;
  await budget.save();
});

// this hook will be called before deleting a transaction
Transaction.addHook('afterDestroy', async (transaction) => {
  const budget = await Budget.findByPk(transaction.budgetId);

  if (transaction.type === 'income') {
    budget.income = budget.income - transaction.amount;
  } else if (transaction.type === 'expense') {
    budget.expense = budget.expense - transaction.amount;
  }

  budget.balance = budget.income - budget.expense;
  await budget.save();
});

module.exports = Transaction;
