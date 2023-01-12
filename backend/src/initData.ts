import { AppDataSource } from './data-source'
import { TodoList } from './entity/TodoList'


export const initData = async () => {
  console.log("Inserting a new todoList into the database...")

  console.log("Loading todoLists from the database...")
  const todoLists = await AppDataSource.manager.find(TodoList)
  console.log("Loaded todoLists: ", todoLists)
  if (!todoLists) {
    const firstList = new TodoList()
    const secondList = new TodoList()
    secondList.title = 'Second List'
    await AppDataSource.manager.save(firstList)
    console.log("Saved a new todoList with id: " + firstList.id)
    await AppDataSource.manager.save(secondList)
    console.log("Saved a new todoList with id: " + secondList.id)

  }



  console.log("Here you can setup and run express / fastify / any other framework.")

}