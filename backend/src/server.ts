// const express = require("express")
// const cors = require('cors')
// const todoListsRouter = require('./routes/todoLists')
// const router = require('./routes')
// const store = require('./model/store')

import cors from 'cors'
import express from 'express'
import { router } from './routes'
import { todoListsRouter } from './routes/todoLists'


export function createServer() {
  const app = express()
  app.use(cors({
    origin: "http://localhost:3000"
  }))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/', router)
  app.use('/todoLists', todoListsRouter)
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.name = '404'
    next(err)
  })
  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      // @ts-ignore
      res.status(err.status || 500)
      // @ts-ignore
      res.render('error', {
        // @ts-ignore
        message: err.message,
        error: err
      })
    })
  }
  app.use((err, req, res) => {
    // @ts-ignore

    res.status(err.status || 500)
    // @ts-ignore

    res.render('error', {
      // @ts-ignore

      message: err.message,
      error: {}
    })
  })
  return app
}
