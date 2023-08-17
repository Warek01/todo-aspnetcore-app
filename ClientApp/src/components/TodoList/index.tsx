import { FC, useState } from 'react'

import type { ITodoItem } from '../../types'
import { TodoItem } from '../index'

interface Props {
  items: ITodoItem[]
  updateItem: (id: number, dto: Partial<ITodoItem>) => Promise<void>
  deleteItem: (id: number) => Promise<void>
}

const TodoList: FC<Props> = ({ items, updateItem, deleteItem }) => {
  const [editingItem, setEditingItem] = useState<ITodoItem | null>(null)

  return (
    <ul
      className="rounded-xl divide-y divide-gray-300 w-[70vw] min-w-[600px] flex flex-col justify-center max-w-[1080px] bg-gray-100
      px-12 py-8"
    >
      {items.map((item) => (
        <TodoItem
          setEditingItem={setEditingItem}
          isEditing={item === editingItem}
          item={item}
          key={item.id}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      ))}
    </ul>
  )
}

export default TodoList
