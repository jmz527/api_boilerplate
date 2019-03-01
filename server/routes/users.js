import express from 'express';
import models from '../models';
import { users as usersController } from '../controllers';

const app = express.Router()

/* POST authentication. */
app.post('/auth', usersController.authenticate);

/* GET users listing. */
app.get('/', usersController.fetchAll);

/* GET single user. */
app.get('/id/:user_id', usersController.fetchOne);

/* POST create user */
app.post('/create', usersController.create);

/* POST update user */
app.post('/update/:user_id', usersController.update);

/* POST destroy user */
app.post('/destroy', usersController.destroy);

export default app;
