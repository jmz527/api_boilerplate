'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo_items = sequelize.define('todo_items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});

  todo_items.associate = function(models) {
    todo_items.belongsTo(models.todos, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
  };
  return todo_items;
};
