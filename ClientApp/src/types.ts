export interface TodoItem {
  id: number
  description: string
  createdAt: string
  updatedAt: string
  isChecked: boolean
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL: string
    }
  }
}
