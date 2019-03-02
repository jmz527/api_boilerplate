import express from 'express';
import models from '../models';
import { users as usersController } from '../controllers';

const app = express.Router()

/* POST authentication. */
app.post('/auth', usersController.authenticate);

/* GET users listing. */
app.get('/', usersController.fetchAll);

/* GET single user. */
app.get('/:user_id', usersController.fetchOne);

/* POST create user */
app.post('/', usersController.create);

/* PUT update user */
app.put('/:user_id', usersController.update);

/* DELETE destroy user */
app.delete('/', usersController.destroy);

export default app;
