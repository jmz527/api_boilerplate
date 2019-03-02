import express from 'express';
import {
  todos as todosController,
  todoItems as todoItemsController
} from '../controllers';

const app = express.Router();

/* POST create todo. */
app.post('/', todosController.create);

/* GET all todos. */
app.get('/', todosController.list);

/* GET single todo. */
app.get('/:todoId', todosController.retrieve);

/* PUT update todo. */
app.put('/:todoId', todosController.update);

/* DELETE todo. */
app.delete('/:todoId', todosController.destroy);


/* POST create todo item. */
app.post('/:todoId/items', todoItemsController.create);

/* PUT update todo item. */
app.put('/:todoId/items/:todoItemId', todoItemsController.update);

/* DELETE todo item. */
app.delete('/:todoId/items/:todoItemId', todoItemsController.destroy);

// For any other request method on todo items, we're going to return "Method Not Allowed"
app.all('/:todoId/items', (req, res) =>
  res.status(405).send({ message: 'Method Not Allowed' })
);

export default app;

