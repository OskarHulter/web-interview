import React from 'react'


export const initialTodo = {
  id: '0',
  name: 'First todo of first list!',
  isComplete: false,
}

export const ACTIONS = {
  ADD: 'add',
  REMOVE: 'remove',
  TOGGLE_COMPLETE: 'toggle-complete',
  SELECT_ACTIVE: 'select-active',
  UPDATE_ACTIVE: 'update-active',
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...todos, newTodo(action.payload.name)]
    case ACTIONS.REMOVE:
      return todos.filter(todo => todo.id !== action.payload.id)
    case ACTIONS.TOGGLE_COMPLETE:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, isComplete: !todo.isComplete }
        }
        return todo
      })
    default:
      return todos
  }
}

function newTodo(name) {
  return { ...initialTodo, name }
}
export function useTodos() {
  const [todos, dispatch] = React.useReducer(reducer, [])

  return {
    todos,
    dispatch,
  }
}