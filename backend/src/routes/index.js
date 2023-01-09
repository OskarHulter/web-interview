const express = require('express')
const router = express.Router()
router.get('/', (req, res) => {
  const data = 'hej'

  if (!data) {
    const error = {
      message: 'server error'
    }

    res.status(500).json({ status: 'error', error })
  }
  res.json({ status: 'ok', data })
})

module.exports = router