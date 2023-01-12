import { todoListUrl } from './index'

export async function fetchDataOld() {
  console.log(todoListUrl)
  const res = await fetch(todoListUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  if (res.status !== 'ok') throw Error()

  const { data } = await res.json()
  console.log(data)
  const parsed = data.map(todoList => [todoList.id, { ...todoList }])
  console.log(parsed)
  

  return parsed
}

export async function fetchTodoLists() {
  const res = await fetch(todoListUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  console.log(res)
  const { data } = await res.json()

  const parsed = Object.fromEntries(
    data.map(todoList => [todoList.id, { ...todoList }])
    )
  return parsed
}

export async function updateTodoLists(data) {
  return fetch(todoListUrl, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(checkStatus)
    .then(() => console.log('updated!!!'))
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    const error = new Error(response.statusText)
    error.response = response
    throw error
  }
}
