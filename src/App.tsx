import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Home from './pages/Home'
import { Item } from './types';
import ls from './utils/localstorage'

const queryClient = new QueryClient()
export const UserContext = React.createContext({
  savedItems: [],
  saveItem: (item: Item) => {},
  removeItem: (item: Item) => {},
  clear: () => {}
})

const initialState = JSON.parse(ls.get('items')) || []

const reducer = (state: Item[], action: { type: string, item: Item }) => {
  const updateLocal = (newItems: Item[]) => ls.set('items', JSON.stringify(newItems))

  switch (action.type) {
    case 'add':
      const sumItems = state.concat(action.item)
      updateLocal(sumItems)
      return sumItems
    case 'remove':
      const differenceItems = state.filter((savedItem: Item) => savedItem.id !== action.item.id)
      updateLocal(differenceItems)
      return differenceItems
    case 'clear':
      ls.remove('items')
      return []
    default:
      return state
  }
}

export const App = () => {
  const [savedItems, dispatch]: any = React.useReducer(reducer, initialState)
  const saveItem = (item: Item) => dispatch({ type: 'add', item })
  const removeItem = (item: Item) => dispatch({ type: 'remove', item })
  const clear = () => dispatch({ type: 'clear' })

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ savedItems, saveItem, removeItem, clear }}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Router>
            <Switch>
              <Route path='/'>
                <Home />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>
      </UserContext.Provider>
    </ChakraProvider>
  )
}
