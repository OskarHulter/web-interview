import React, { Fragment, useState, useEffect, useCallback } from 'react'
import {
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from '@mui/material'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { TodoListForm } from './TodoListForm'
import { fetchTodoLists } from '../../data-access'

// Main Task
// Persist the todo lists on the server. Persisting in a database is not required. (Simple js structures on the server is fine). If you do go for an actual DB (again not required), be sure to include instructions of how to get it up and running.

// Additional tasks
// Don't require users to press save when an item is added/edited in the todo list. (Autosave functionality)
// Make it possible to indicate that a todo is completed.
// Indicate that a todo list is completed if all todo items within are completed.
// Add a date for completion to todo items. Indicate how much time is remaining or overdue.


export const TodoLists = ({ style }) => {
  const fetchData = useCallback(async () => {
  const data = await fetchTodoLists()

  setTodoLists(data)
}, [])

  useEffect(() => {
    try {
    fetchData()
    } catch(e) {
      console.error(e)
  }
}, [fetchData])
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()


  if (!Object.keys(todoLists).length) return null
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component='h2'>My Todo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((key) => (
              <ListItemButton key={key} onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[key].title} />
              </ListItemButton>
            ))}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeList] && (
        <TodoListForm
          key={activeList}
          todoList={todoLists[activeList]}
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </Fragment>
  )
}
