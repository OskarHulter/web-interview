import React from 'react'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useTodos, ACTIONS } from '../hooks/useTodos'
import { useDebounce } from '../hooks/useDebounce'
import { post } from '../../data-access'
function searchCharacters(search) {
  return console.log(search)
  const apiKey = 'f9dfb1e8d466d36c27850bedd2047687'
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: 'GET',
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error)
      return []
    })
}
export const TodoListForm = ({ todoList, saveTodoList }) => {
  // State and setters for ...
  // Search term
  const [todoInput, setTodoInput] = React.useState('')
  // API search results
  const [results, setResults] = React.useState([])
  // Searching status (whether there is pending API request)
  const [isTyping, setIsTyping] = React.useState(false)
  // Debounce search term so that it only gives us latest value ...
  // ... if todoInput has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedTodoInput = useDebounce(todoInput, 500)
  // Effect for API call
  React.useEffect(
    () => {
      if (debouncedTodoInput) {
        setIsTyping(true)
        searchCharacters(debouncedTodoInput).then((results) => {
          setIsTyping(false)
          setResults(results)
        })
      } else {
        setResults([])
        setIsTyping(false)
      }
    },
    [debouncedTodoInput] // Only call effect if debounced search term changes
  )

  const { todos, dispatch } = useTodos()
  // const didMount = React.useRef(false)
  // React.useEffect(() => {
  //   if (didMount.current) {
  //     saveTodoList({ todos })
  //   } else {
  //     didMount.current = true
  //   }
  // }, [todos, saveTodoList])

  const handleSubmit = (data) => {
    post(data)
  }

  if (todos.length) return null
  return (
    <Card sx={{ margin: '0 1rem' }}>
      <CardContent>
        <Typography component='h2' style={{ color: todoList.isComplete ? '#00FF33' : '#FFF000' }}>
          {todoList.title}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
        >
          {todoList.todos.map((todo, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ margin: '8px' }} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                sx={{ flexGrow: 1, marginTop: '1rem' }}
                label='What to do?'
                value={todo.name}
                onChange={(e) => setTodoInput(e.target.value)}
              />

              <Checkbox
                checked={todo.isComplete}
                onChange={() =>
                  dispatch({
                    type: ACTIONS.TOGGLE_COMPLETE,
                    payload: { id: todo.id },
                  })
                }
                inputProps={{ 'aria-label': 'controlled' }}
              />

              <Button
                sx={{ margin: '8px' }}
                size='small'
                color='secondary'
                onClick={(index) =>
                  dispatch({
                    type: ACTIONS.REMOVE,
                    payload: { id: index },
                  })
                }
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={(e) => {
                e.preventDefault()
                dispatch({ type: ACTIONS.ADD, payload: { name: '' } })
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
