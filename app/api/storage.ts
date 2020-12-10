import {
  setDatabase,
  addDocument,
  getDocument,
  updateDocument,
  queryDocuments,
  deleteDocument,
  destroyDatabase,
} from '@/services/couchbaseService'
import { Database, QueryDB } from './types'

export const createDatabase = (name: string): Database => setDatabase(name)

export const createSomeDatabases = (names: string[]): void => {
  names.map((name) => createDatabase(name))
}

export const addItem = <T>(database: Database, value: T, itemId: string): void =>
  addDocument(database, value, itemId)

export const getItem = <T>(database: Database, itemId: string): T => getDocument(database, itemId)

export const getAllItems = <T>(database: Database): Array<T> =>
  database.query({
    select: [],
  })

export const updateItem = <T>(database: Database, itemId: string, value: T): void =>
  updateDocument(database, itemId, value)

export const deleteItem = (database: Database, itemId: string): void =>
  deleteDocument(database, itemId)

export const queryItems = <T>(database: Database, query: QueryDB): Array<T> =>
  queryDocuments(database, query)

// export const initializeDatabase = <T>(nameDB: string, callback: (item: T) => void): Database => {
//   const database = createDatabase(nameDB)
//   getAllTheItems<T>(database).forEach((item: T) => callback(item))

//   console.log(`storage::initializeDB: ${JSON.stringify(database)}`)

//   return database
// }

export const resetDatabase = (database: Database): void => {
  // FIXME: Clean the db without destroy it.
  destroyDatabase(database)
}
