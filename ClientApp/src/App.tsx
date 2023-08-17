import { useEffect, useState, useCallback } from 'react'

import type { ITodoItem } from './types'
import { api } from './api'
import { CreateTodoItem, TodoList } from './components'

function App() {
  const [items, setItems] = useState<ITodoItem[]>([])

  const fetchItems = useCallback(async () => {
    setItems(await api.getAll())
  }, [])

  const updateItem = useCallback(
    async (id: number, dto: Partial<ITodoItem>) => {
      await api.update(id, dto)
      fetchItems()
    },
    [],
  )

  const deleteItem = useCallback(async (id: number) => {
    await api.delete(id)
    fetchItems()
  }, [])

  const createItem = useCallback(async (dto: Partial<ITodoItem>) => {
    await api.create(dto)
    fetchItems()
  }, [])

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="flex flex-col items-center py-12 gap-16">
      <CreateTodoItem createItem={createItem} />
      <TodoList items={items} updateItem={updateItem} deleteItem={deleteItem} />
    </div>
  )
}

export default App
