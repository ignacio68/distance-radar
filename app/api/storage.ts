import {
  cbSetDatabase,
  cbAddDocument,
  cbGetDocument,
  cbUpdateDocument,
  cbQueryDocuments,
  cbDeleteDocument,
  cbDestroyDatabase,
} from '@/services/couchbaseService'
import { Database, QueryDB } from './types'

export const createDatabase = (name: string): Database => cbSetDatabase(name)

export const createSomeDatabases = (names: string[]): void => {
  names.map((name) => createDatabase(name))
}

export const addItem = <T>(
  database: Database,
  value: T,
  itemId: string,
): void => cbAddDocument(database, value, itemId)

export const getItem = <T>(database: Database, itemId: string): T =>
  cbGetDocument(database, itemId)

export const getAllItems = <T>(database: Database): Array<T> =>
  queryItems(database, { select: [] })

export const updateItem = <T>(
  database: Database,
  itemId: string,
  value: T,
): void => cbUpdateDocument(database, itemId, value)

export const deleteItem = (database: Database, itemId: string): void =>
  cbDeleteDocument(database, itemId)

export const queryItems = <T>(database: Database, query: QueryDB): Array<T> =>
  cbQueryDocuments(database, query)

// export const initializeDatabase = <T>(nameDB: string, callback: (item: T) => void): Database => {
//   const database = createDatabase(nameDB)
//   getAllTheItems<T>(database).forEach((item: T) => callback(item))

//   console.log(`storage::initializeDB: ${JSON.stringify(database)}`)

//   return database
// }

export const resetDatabase = (database: Database): void =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllItems(database).forEach((item: any) => deleteItem(database, item))
// cbDestroyDatabase(database)

export const deleteDatabase = (database: Database): void =>
  cbDestroyDatabase(database)
