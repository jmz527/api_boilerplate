'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItems = sequelize.define('todo_items', {
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

  TodoItems.associate = function(models) {
    TodoItems.belongsTo(models.todos, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
  };
  return TodoItems;
};
