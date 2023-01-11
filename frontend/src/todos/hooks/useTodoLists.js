import React from 'react'
// import { initialTodo } from './useTodos'
import { fetchTodoLists } from '../../data-access/requests'

// const mockStore = {
//   '0000000001': {
//     id: '0000000001',
//     name: 'First List',
//     isComplete: false,
//     isActive: true,
//     todos: [initialTodo],
//   },
//   '0000000002': {
//     id: '0000000002',
//     name: 'Second List',
//     isComplete: false,
//     isActive: false,
//     todos: [initialTodo],
//   }
// }

export function useTodoLists() {
  const [todoLists, setTodoLists] = React.useState({})
  const [activeList, setActiveList] = React.useState()

  const saveTodoList = React.useCallback(({ todos }) => {
    //const listToUpdate = todoLists[id]

    if (todos.length === 0) {
      setTodoLists({
        ...todoLists,
        [todoLists[activeList]]: {
          ...todoLists[activeList],
          todos
        },
      })
    }
    setTodoLists({
      ...todoLists,
      [todoLists[activeList]]: { ...todoLists[activeList], todos },
    })
  }, [activeList, todoLists])

// const getInitialTodos = React.useCallback(() => {
//   return todoLists[activeList].todos
// }, [activeList, todoLists])

  const fetchData = React.useCallback(async () => {
    const data = await fetchTodoLists()
    setTodoLists(data)
  }, [])

  React.useEffect(() => {
    try {
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }, [fetchData])

  return {
    todoLists,
    activeList,
    setActiveList,
    saveTodoList,
  }
}