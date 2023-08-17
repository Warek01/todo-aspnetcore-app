import type { ITodoItem } from './types'

const URL = process.env.REACT_APP_API_URL

export const api = {
  async getAll(): Promise<ITodoItem[]> {
    const req = await fetch(`${URL}/todo/all`)
    return req.json()
  },

  async find(id: number): Promise<ITodoItem[]> {
    const req = await fetch(`${URL}/todo/find/${id}`)
    return req.json()
  },

  async delete(id: number): Promise<ITodoItem[]> {
    const req = await fetch(`${URL}/todo/delete/${id}`, {
      method: 'DELETE',
    })
    return req.json()
  },

  async update(id: number, dto: Partial<ITodoItem>): Promise<ITodoItem> {
    const req = await fetch(`${URL}/todo/update/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return req.json()
  },

  async create(dto: Partial<ITodoItem>): Promise<ITodoItem> {
    const req = await fetch(`${URL}/todo/create`, {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return req.json()
  },
}
