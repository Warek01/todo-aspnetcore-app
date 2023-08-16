import { useEffect, useState } from 'react'

import { TodoList } from './components'
import { api } from './api'
import { TodoItem } from './types'

function App() {
  const [items, setItems] = useState<TodoItem[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      setItems(await api.getAll())
    }

    fetchItems()
  }, [])

  console.log(items)

  return (
    <div className="bg-red-600">
      <TodoList />
    </div>
  )
}

export default App
