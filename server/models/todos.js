'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('todos', {
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

  Todos.associate = function(models) {
    Todos.hasMany(models.todo_items, {
      foreignKey: 'todoId',
      as: 'todoItems',
    });
  };
  return Todos;
};
