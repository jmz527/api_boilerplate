import { User } from '../models';

module.exports = {
  create(req, res) {
    return User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  },
  // create(req, res) {
  //   return User.findOrCreate({ where: { username: req.body.username }, defaults: {
  //     first_name: req.body.first_name,
  //     last_name: req.body.last_name,
  //     email: req.body.email,
  //     password: req.body.password
  //   }}).spread((user, created) => {
  //     if (created) {
  //       res.status(201).send(user)
  //     } else {
  //       res.status(400).send({ created });
  //     }
  //   }).catch(error => res.status(400).send(error));
  // },
  // update(req, res) {
  //   return TodoItem
  //     .find({
  //         where: {
  //           id: req.params.todoItemId,
  //           todoId: req.params.todoId,
  //         },
  //       })
  //     .then(todoItem => {
  //       if (!todoItem) {
  //         return res.status(404).send({
  //           message: 'TodoItem Not Found',
  //         });
  //       }

  //       return todoItem
  //         .update(req.body, { fields: Object.keys(req.body) })
  //         .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
  //         .catch(error => res.status(400).send(error));
  //     })
  //     .catch(error => res.status(400).send(error));
  // },
  // destroy(req, res) {
  //   return TodoItem
  //     .find({
  //         where: {
  //           id: req.params.todoItemId,
  //           todoId: req.params.todoId,
  //         },
  //       })
  //     .then(todoItem => {
  //       if (!todoItem) {
  //         return res.status(404).send({
  //           message: 'TodoItem Not Found',
  //         });
  //       }

  //       return todoItem
  //         .destroy()
  //         .then(() => res.status(204).send())
  //         .catch(error => res.status(400).send(error));
  //     })
  //     .catch(error => res.status(400).send(error));
  // },
};
