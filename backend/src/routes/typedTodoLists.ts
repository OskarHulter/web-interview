import express, { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { TodoList } from '../entity/TodoList'


export const typedTodoListsRouter = express.Router()

typedTodoListsRouter.get('/todolists', async function (req: Request, res: Response) {
  const todoLists = await AppDataSource.getRepository(TodoList).find()
  res.json(todoLists)
})

typedTodoListsRouter.get('/todolists/:id', async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(TodoList).findOneBy({
    id: req.params.id,
  })
  return res.send(results)
})

typedTodoListsRouter.post('/todolists', async function (req: Request, res: Response) {
  const todoList = await AppDataSource.getRepository(TodoList).create(req.body)
  const results = await AppDataSource.getRepository(TodoList).save(todoList)
  return res.send(results)
})

typedTodoListsRouter.put('/todolists/:id', async function (req: Request, res: Response) {

  const todoList = await AppDataSource.getRepository(TodoList).findOneBy({
    id: req.params.id,
  })
  AppDataSource.getRepository(TodoList).merge(todoList, req.body)
  const results = await AppDataSource.getRepository(TodoList).save(todoList)
  return res.send(results)
})

typedTodoListsRouter.delete('/todolists/:id', async function (req: Request, res: Response) {

  const results = await AppDataSource.getRepository(TodoList).delete(req.params.id)
  return res.send(results)
})
