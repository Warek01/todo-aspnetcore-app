import { FC, useCallback } from 'react'
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import { object, string } from 'yup'

import type { ITodoItem } from '../../types'

interface Props {
  createItem: (dto: Partial<ITodoItem>) => Promise<void>
}

const validationSchema = object({
  description: string().min(1).max(1000).required(),
})

const CreateTodoItem: FC<Props> = ({ createItem }) => {
  const handelSubmit = useCallback(
    (
      values: Partial<ITodoItem>,
      formikHelpers: FormikHelpers<Partial<ITodoItem>>,
    ) => {
      createItem(values)
      formikHelpers.resetForm()
    },
    [],
  )

  return (
    <Formik
      initialValues={{ description: '' }}
      onSubmit={handelSubmit}
      validateOnMount={false}
      validateOnChange={false}
      validateOnBlur={true}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      <Form className="flex w-[70vw] max-w-[1080px] gap-12 justify-between">
        <label className="w-full">
          <Field
            name="description"
            className="bg-gray-200 w-full rounded-full py-2 px-4"
            placeholder="Description"
            autoComplete="off"
            type="text"
          />
          <ErrorMessage
            name="description"
            component="p"
            className="text-xs text-red-500 px-4 pt-1 absolute capitalize-first"
          />
        </label>
        <button
          type="submit"
          aria-label="create"
          className="bg-gray-200 rounded-xl px-3 py-2"
        >
          Create
        </button>
      </Form>
    </Formik>
  )
}

export default CreateTodoItem
