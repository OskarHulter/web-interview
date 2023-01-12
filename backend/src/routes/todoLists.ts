import express, { NextFunction, Request, Response } from 'express'
import { TodoList } from '../entity/TodoList'
import { setStore } from '../model/store'
import { todoLists } from '../model/todoLists'


export const todoListsRouter = express.Router()

todoListsRouter.get('/', (req, res) => {
  res.send({ status: 'ok', data: todoLists })
})

todoListsRouter.post('/', async (req: Request<TodoList[]>, res) => {
  const body = req.body
  const isValid = true
  if (isValid) {
    const data = JSON.stringify(body)
    await setStore(data)
    res.send({ status: 'ok' })
  } else {
    console.log('error')
    res.send({ status: 'error', message: 'bad request' })
  }
})

todoListsRouter.get('/new', (req, res) => {
  const data = 'hej'
  res.json({ status: 'ok', data })
})

todoListsRouter.route('/:id')
  .get((req: Request, res: Response) => {

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

todoListsRouter.param('id', (req: Request, res, next: NextFunction, id) => {
  // @ts-ignore
  req.todolist = todoLists[id]
  next()
})

