import React from 'react'
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
//import { useStore } from '../hooks/useStore'
import { useTodoLists } from '../hooks/useTodoLists'


// Main Task
// Persist the todo lists on the server.
// * Mostly done

// Additional tasks
// Don't require users to press save when an item is added/edited in the todo list. (Autosave functionality)

// Make it possible to indicate that a todo is completed.
// * Done

// Indicate that a todo list is completed if all todo items within are completed.
// ! .length


// Add a date for completion to todo items. Indicate how much time is remaining or overdue.
// ! Intl.

export const TodoLists = ({ style }) => {
  const { todoLists, activeList, setActiveList, saveTodoList } = useTodoLists()
  React.useEffect(()=> {console.log(activeList)}, [activeList])
  if (!Object.keys(todoLists).length) return null
  return (
    <>
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
          saveTodoList={saveTodoList}
        />
      )}
    </>
  )
}
