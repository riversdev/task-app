import express, { type Express } from 'express'
import cors from 'cors'
import { dbConnection } from '@/db'
import { tasksRouter } from '@/routers'
import { getEnvVariables } from '@/helpers'

const { PORT } = getEnvVariables()

export class Server {
  app: Express
  port: string

  constructor() {
    this.app = express()
    this.port = PORT

    dbConnection()

    this.middlewares()
    this.routers()
    this.listener()
  }

  middlewares = () => {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routers = () => {
    this.app.use('/api/tasks', tasksRouter)
  }

  listener = () => this.app.listen(this.port, () => console.log(`Server online in port ${this.port}`))
}
