import express from 'express';
import {
  todos as todosController,
  todoItems as todoItemsController
} from '../controllers';

const app = express.Router()

app.post('/', todosController.create);
app.get('/', todosController.list);
app.get('/:todoId', todosController.retrieve);
app.put('/:todoId', todosController.update);
app.delete('/:todoId', todosController.destroy);

app.post('/:todoId/items', todoItemsController.create);
app.put('/:todoId/items/:todoItemId', todoItemsController.update);
app.delete('/:todoId/items/:todoItemId', todoItemsController.destroy);

// For any other request method on todo items, we're going to return "Method Not Allowed"
app.all('/:todoId/items', (req, res) =>
  res.status(405).send({
    message: 'Method Not Allowed',
}));

export default app;

