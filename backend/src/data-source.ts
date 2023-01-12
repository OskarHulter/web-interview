import 'reflect-metadata'
import { DataSource } from 'typeorm'



export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}']
})
