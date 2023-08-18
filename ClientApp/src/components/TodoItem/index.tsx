import {
  ChangeEventHandler,
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react'

import type { ITodoItem } from '../../types'
import { DeleteBin, Check, Pencil } from '../../icons'

interface Props {
  item: ITodoItem
  isEditing: boolean
  updateItem: (id: number, dto: Partial<ITodoItem>) => Promise<void>
  deleteItem: (id: number) => Promise<void>
  setEditingItem: Dispatch<SetStateAction<ITodoItem | null>>
}

const TodoItem: FC<Props> = ({
  item,
  updateItem,
  deleteItem,
  isEditing,
  setEditingItem,
}) => {
  const { id, isChecked, description, updatedAt, createdAt } = item
  const descriptionRef = useRef<HTMLInputElement>(null)

  const handleCheck: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      updateItem(id, { isChecked: event.target.checked })
    },
    [item],
  )

  const handleEdit = useCallback(async () => {
    const newDescription = descriptionRef.current?.innerText.trim() ?? ''

    if (!newDescription) {
      return
    }

    setEditingItem(null)
    await updateItem(id, {
      description: newDescription,
    })
  }, [])

  useEffect(() => {
    if (isEditing) {
      descriptionRef.current?.focus()

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          handleEdit()
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [isEditing])

  return (
    <li className="p-6 flex justify-between gap-3">
      <label htmlFor={id.toString()}>
        <p
          ref={descriptionRef}
          contentEditable={isEditing}
          className={`${isChecked && 'line-through'} ${
            isEditing ? 'cursor-text' : 'cursor-pointer'
          } text-gray-700 text-lg whitespace-pre-wrap`}
        >
          {description}
        </p>
      </label>
      <div className="flex flex-col justify-start gap-2">
        <input
          id={id.toString()}
          type="checkbox"
          defaultChecked={isChecked}
          disabled={isEditing}
          onChange={handleCheck}
          className="transform-gpu scale-110"
        />
        <button onClick={() => deleteItem(id)} aria-label="delete">
          <DeleteBin width={18} height={18} className="fill-red-500" />
        </button>
        {isEditing ? (
          <button aria-label="save edit" onClick={handleEdit}>
            <Check width={18} height={18} className="fill-emerald-400" />
          </button>
        ) : (
          <button aria-label="edit" onClick={() => setEditingItem(item)}>
            <Pencil width={18} height={18} className="fill-emerald-400" />
          </button>
        )}
      </div>
    </li>
  )
}

export default TodoItem
