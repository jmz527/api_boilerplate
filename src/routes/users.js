import models from '../../models'
import express from 'express'
import bcrypt from 'bcryptjs'

const router = express.Router()

// allow CORS
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

/* GET users listing. */
router.get('/', (req, res, next) => {
  models.User.findAll().then((users) => {
    res.json({ users: users })
  })
})

router.post('/create', (req, res) => {
  models.User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  })
  .then((m) => {
    console.log('NEW USER ADDED TO DB!!!!!!')
    res.json({ user_id: m.id })
  })
})

// User.findOrCreate({where: {username: 'fnord'}, defaults: {job: 'something else'}}))

router.post('/auth', (req, res) => {
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then((m) => {
    if (bcrypt.compareSync(req.body.password, m.password)) {
      console.log('AUTH USER SUCCESS!!!!!!')

      res.json(m)
    } else {
      res.json(['ERROR'])
    }
  })
})

router.get('/id/:user_id', (req, res) => {
  models.User.findOne({
    where: {
      id: req.params.user_id
    }
  }).then((m) => {
    console.log('FOUND USER!!!!!!')
    res.json(m)
  })
})

router.post('/destroy', (req, res) => {
  models.User.destroy({
    where: {
      id: req.body.user_id
    }
  }).then((m) => {
    console.log('USER DELETED!!!!!!')
    console.log(m)
    res.json(m)

    // res.redirect('/');
  })
})

export default router
