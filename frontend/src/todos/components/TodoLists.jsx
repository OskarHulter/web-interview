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
import { fetchTodoLists, updateTodoLists } from '../../data-access/requests'

export const TodoLists = ({ style }) => {
  const [activeList, setActiveList] = React.useState()
  const [todoLists, setTodoLists] = React.useState({})

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
          saveTodoList={(id, { todos }) => {
            const listToUpdate = todoLists[id]
            updateTodoLists(todoLists)
            setTodoLists({
              ...todoLists,
              [id]: { ...listToUpdate, todos },
            })
          }}
        />
      )}
    </>
  )
}
