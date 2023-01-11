import { useCallback, useEffect, useState } from 'react'
import { initialTodo } from './useTodos'


const mockStore = {
  '0000000001': {
    id: '0000000001',
    name: 'First List',
    isComplete: false,
    isActive: true,
    todos: [initialTodo],
  },
  '0000000002': {
    id: '0000000002',
    name: 'Second List',
    isComplete: false,
    isActive: false,
    todos: [initialTodo],
  },
}

export function useStore() {
  const [store, setStore] = useState({})

  const fetchData = useCallback(async () => {
    //const data = await fetchTodoLists()
    setStore(mockStore)
  }, [])

  useEffect(() => {
    try {
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }, [fetchData])

  return [
    store
  ]
}