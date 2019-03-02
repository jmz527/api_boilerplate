'use strict';
module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  todos.associate = function(models) {
    todos.hasMany(models.todo_items, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
  };
  return todos;
};
