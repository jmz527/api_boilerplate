import { users } from '../models';
import bcrypt from 'bcryptjs';

module.exports = {
  create(req, res) {
    /*
     findOrCreate returns an array containing the object that was found or created and
      a boolean that will be true if a new object was created and false if not.
    */
    return users.findOrCreate({ where: { username: req.body.username }, defaults: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }}).spread((user, created) => {
      /*
       The "spread" divides the array into its 2 parts and passes them as
       arguments to the callback function, which treats them as "user" and "created" in this case.
      */
      if (created) {
        res.status(201).send(user)
      } else {
        // status for already existing data
        res.sendStatus(400);
      }
    }).catch(error => res.status(400).send(error));
  },
  authenticate(req, res) {
    return users.findOne({ where: { username: req.body.username } }).then((user) => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json(user)
      } else {
        res.sendStatus(400);
      }
    })
  },
  fetchAll(req, res) {
    return users.findAll().then((users) => {
      res.status(200).json({ users })
    }).catch(error => res.status(400).send(error));
  },
  fetchOne(req, res) {
    return users
      .findByPk(req.params.user_id)
      .then((user) => res.status(200).json(user))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return users.upsert({ id: req.params.user_id, ...req.body })
      .then((created) => {
        // console.log(created);

        res.status(201).send(created);
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return users.destroy({
      where: { id: req.body.user_id }
    }).then((user) => {
      // console.log(`\x1b[31m%s\x1b[0m`, 'USER DELETED!!!!!!')
      res.status(204).json(user)
    }).catch(error => res.status(400).send(error));
  },
};
