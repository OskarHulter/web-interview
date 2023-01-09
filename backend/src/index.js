const express = require('express')
const cors = require('cors')
const app = express()
const todoListsRouter = require('./routes/todoLists')
const router = require('./routes')
const PORT = 3001


// origin: "http://127.0.0.1:3000"

app.use(cors({
  origin: "http://localhost:3000"
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)
app.use('/todoLists', todoListsRouter)
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))