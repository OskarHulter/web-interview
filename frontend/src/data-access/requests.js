import { url, fetchMockStore, fetchMockList, sleep } from './index'

export async function fetchTodoLists() {
  const res = await fetch(`${url}/todolists`,
    {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  const { data } = await res.json()
  console.log(data)
  const parsed = Object.fromEntries(
    data.map(todoList => [todoList.id, { ...todoList }]))

  return parsed
}

export const mockFetchTodoLists = async (type) => {
  await sleep(1000)
  if (type === 'list') {
    const res = await fetchMockList()
    const data = Object.fromEntries(
      res.map(todoList => [todoList.id, { ...todoList }]))

    return data
  } else {
    const data = await fetchMockStore()
    return data
  }
}

