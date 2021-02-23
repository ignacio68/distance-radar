import {
  cbSetDatabase,
  cbCreateDocument,
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

export const addItemToDatabase = <T>(database: Database, value: T, itemId: string): void =>
  cbCreateDocument(database, value, itemId)

export const getItemFromDatabase = <T>(database: Database, itemId: string): T =>
  cbGetDocument(database, itemId)

export const getAllItemsFromDatabase = <T>(database: Database): Array<T> =>
  queryItemsInDatabase(database, { select: [] })

export const updateItemInDatabase = <T>(database: Database, itemId: string, value: T): void =>
  cbUpdateDocument(database, itemId, value)

export const deleteItemInDatabase = (database: Database, itemId: string): void => {
  console.log(`storage.ts::deleteItemInDatabase::itemID: ${itemId}`)
  cbDeleteDocument(database, itemId)
}

export const queryItemsInDatabase = <T>(database: Database, query: QueryDB): Array<T> =>
  cbQueryDocuments(database, query)

// export const initializeDatabase = <T>(nameDB: string, callback: (item: T) => void): Database => {
//   const database = createDatabase(nameDB)
//   getAllTheItems<T>(database).forEach((item: T) => callback(item))

//   console.log(`storage::initializeDB: ${JSON.stringify(database)}`)

//   return database
// }

export const resetDatabase = (database: Database): void =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllItemsFromDatabase(database).forEach((item: any) =>
    deleteItemInDatabase(database, item.itemId),
  )
// cbDestroyDatabase(database)

export const deleteDatabase = (database: Database): void => cbDestroyDatabase(database)
