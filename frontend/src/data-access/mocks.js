

const mockData = {
  '0000000001': {
    id: '0000000001',
    title: 'First List',
    isActive: false,
    todos: [{
      description: 'First todo of first list!',
      isComplete: false,
    }],
  },
  '0000000002': {
    id: '0000000002',
    title: 'Second List',
    isActive: false,
    todos: [{
      description: 'First todo of first list!',
      isComplete: false,
    }],
  },
}

const mockList = [
  {
    id: '0000000001',
    title: 'First List',
    todos: [{
      isComplete: false,
      taskDescription: 'First todo of first list!'
    }],
  },
  {
    id: '0000000002',
    title: 'Second List',
    todos: [{
      isComplete: false,
      taskDescription: 'First todo of first list!'
    }],
  },
]

export async function fetchMockStore() {
  return mockData
}
async function fetchMockList() {
  return mockList
}

export const mockFetchTodoLists = async (type) => {
  if (type === 'list') {
    const res = await fetchMockList()
    const data = Object.fromEntries(
      res.map(todoList => [todoList.id, { ...todoList }])
    )

    return data
  } else {
    const data = await fetchMockStore()
    return data
  }
}
