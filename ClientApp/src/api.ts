import type { TodoItem } from './types'

const URL = process.env.REACT_APP_API_URL

export const api = {
  async getAll(): Promise<TodoItem[]> {
    console.log(`${URL}/todo/all`)
    const req = await fetch(`${URL}/todo/all`)
    return req.json()
  },
  async find(id: number): Promise<TodoItem[]> {
    const req = await fetch(`${URL}/todo/find/${id}`)
    return req.json()
  },
}
