import { ChangeEventHandler, FC, useCallback } from 'react'

import type { ITodoItem } from '../../types'
import { Bin, Pencil } from '../../icons'

interface Props {
  item: ITodoItem
  updateItem: (id: number, dto: Partial<ITodoItem>) => Promise<void>
  deleteItem: (id: number) => Promise<void>
}

const TodoItem: FC<Props> = ({ item, updateItem, deleteItem }) => {
  const { id, isChecked, description, updatedAt, createdAt } = item

  const handleCheck: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      updateItem(id, { isChecked: event.target.checked })
    },
    [item],
  )

  return (
    <li className="p-6 flex justify-between gap-3">
      <label htmlFor={id.toString()}>
        <p className={`${isChecked && 'line-through'} text-gray-700 text-lg`}>
          {description}
        </p>
      </label>
      <div className="flex flex-col justify-start gap-2">
        <input
          id={id.toString()}
          type="checkbox"
          defaultChecked={isChecked}
          onChange={handleCheck}
          className="transform-gpu scale-110"
        />
        <button onClick={() => deleteItem(id)} aria-label="delete">
          <Bin width={18} height={18} className="fill-red-500" />
        </button>
        <button aria-label="edit">
          <Pencil width={18} height={18} className="fill-emerald-400" />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
