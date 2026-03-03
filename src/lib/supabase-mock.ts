export const mockDb = {
  getTable: <T>(table: string): T[] => {
    try {
      const data = localStorage.getItem(`sb_mock_${table}`)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },
  setTable: <T>(table: string, data: T[]): void => {
    localStorage.setItem(`sb_mock_${table}`, JSON.stringify(data))
  },
  insert: <T extends { id: string }>(table: string, record: T): T => {
    const data = mockDb.getTable<T>(table)
    data.push(record)
    mockDb.setTable(table, data)
    return record
  },
  update: <T extends { id: string }>(
    table: string,
    id: string,
    updates: Partial<T>,
  ): T => {
    const data = mockDb.getTable<T>(table)
    const index = data.findIndex((item) => item.id === id)
    if (index === -1) throw new Error(`Record not found in ${table}`)
    data[index] = { ...data[index], ...updates }
    mockDb.setTable(table, data)
    return data[index]
  },
}
