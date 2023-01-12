import express from 'express'


export const router = express.Router()
router.get('/', (req, res) => {
  const data = 'hello'
  res.send({ status: 'ok', data })
})
