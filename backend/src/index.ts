import cors from 'cors'
import express from 'express'
import { createServer } from './server'


const PORT = 3001

// AppDataSource.initialize().then(() => console.log("Data Source has been initialized!")).catch(error => console.log(error))

// const app = express()
// app.use(cors(options))
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
const app = createServer()

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))