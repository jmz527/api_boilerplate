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
    console.log(`\x1b[33m%s\x1b[0m`, 'ALL USER!!!!!!')
    res.json({ users: users })
  })
})

router.post('/create', (req, res) => {
  models.User.findOrCreate({ where: { username: req.body.username }, defaults: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  }})
  .spread((user, created) => {
    if (created) {
      console.log(`\x1b[32m%s\x1b[0m`, 'NEW USER ADDED TO DB!!!!!!')
      console.log(`\x1b[2m`, user.get({ plain: true }))
      res.json({ created: created, user_id: user.id })
    } else {
      console.log(`\x1b[31m%s\x1b[0m`, 'USER ALREADY EXISTS!!!!')
      res.json({ created: created })
    }
  })

  /*
   findOrCreate returns an array containing the object that was found or created and
    a boolean that will be true if a new object was created and false if not, like so:

  [ {
      username: 'sdepold',
      job: 'Technical Lead JavaScript',
      id: 1,
      createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
      updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
    },
    true ]

   In the example above, the "spread" on line 32 divides the array into its 2 parts and
    passes them as arguments to the callback function, which treats them as "user" and "created" in this case.
  */
})

// router.post('/createOne', (req, res) => {
//   models.User.create({
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     email: req.body.email,
//     username: req.body.username,
//     password: req.body.password
//   })
//   .then((m) => {
//     console.log(`\x1b[32m%s\x1b[0m`, 'NEW USER ADDED TO DB!!!!!!')
//     // console.log(`\x1b[2m`, m)
//     res.json({ user_id: m.id })
//   })
// })


router.post('/auth', (req, res) => {
  models.User.findOne({
    where: {
      username: req.body.username
    }
  }).then((m) => {
    if (bcrypt.compareSync(req.body.password, m.password)) {
      console.log(`\x1b[34m%s\x1b[0m`, 'AUTH USER SUCCESS!!!!!!')

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
    console.log(`\x1b[33m%s\x1b[0m`, 'FOUND USER!!!!!!')
    // console.log(`\x1b[2m`, m)
    res.json(m)
  })
})

router.post('/destroy', (req, res) => {
  models.User.destroy({
    where: {
      id: req.body.user_id
    }
  }).then((m) => {
    console.log(`\x1b[31m%s\x1b[0m`, 'USER DELETED!!!!!!')
    // console.log(`\x1b[2m`, m)
    res.json(m)

    // res.redirect('/');
  })
})

export default router