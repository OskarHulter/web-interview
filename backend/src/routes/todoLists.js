const express = require('express')
const router = express.Router()

router.use(logger)
const todoLists = [
  {
    "id": "0000000001",
    "title": "First List",
    "isComplete": false,
    "todos": [{
      "id": "0",
      "name": "First todo of first list!",
      "isComplete": false,
  }],
  },
  {
    "id": "0000000002",
    "title": "Second List",
    "isComplete": false,
    "todos": [{
      "id": "0",
      "name": "First todo of second list!",
      "isComplete": false,
    }],
  }
]
router.get('/', (req, res) => {
  res.send({ status: 'ok', data: todoLists })
})

router.post('/', (req, res) => {
  console.log(req.body.todoList.title)
  const isValid = true
  if (isValid) {
    todoLists.push({
      id: req.body.id,
      title: req.body.title,
      todos: req.body.todos
    }) //{ ...req.body }
    res.redirect(`/todolists/${todoLists.length - 1}`)
  } else {
    console.log('error')
    res.render('todolists/new', { ...req.body })
  }
  const data = req.body.title
  res.json({ status: 'ok', data })
})

router.get('/new', (req, res) => {
  const data = 'hej'
  res.json({ status: 'ok', data })
})

router.route('/:id')
  .get((req, res) => {
    console.log(req.todolist)
    res.send(`todolist get by ${req.params.id}`)

  }).put((req, res) => {
    req.params.id
    const data = `user get by ${req.params.id}`

    res.json({ status: 'ok', data })

  }).delete((req, res) => {
    req.params.id
    const data = `user get by ${req.params.id}`

    res.json({ status: 'ok', data })
  })

function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}

router.param('id', (req, res, next, id) => {
  req.todolist = todoLists[id]
  next()
})

module.exports = router
// const todoLists = [
//   {
//     id: '0000000001',
//     title: 'First List',
//     todos: ['First todo of first list!'],
//   },
//   {
//     id: '0000000002',
//     title: 'Second List',
//     todos: ['First todo of second list!'],
//   },
// ]