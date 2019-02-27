import todos from './todos';
import users from './users';

module.exports = (app) => {

  // Routes
  // app.use('/', index)

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));
  app.use('/api/todos', todos);
  app.use('/api/users', users);

};
