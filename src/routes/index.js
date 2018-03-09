import express from 'express'
const router = express.Router()

router.get('/', (req, res) => res.json(['Express Sqlite3 API']))

export default router
