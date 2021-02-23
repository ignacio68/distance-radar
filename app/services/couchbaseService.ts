import { Database as CouchBase, Query } from './types'

export const cbSetDatabase = (name: string): CouchBase => new CouchBase(name)

export const cbCloseDatabase = (database: CouchBase): void => database.close()

export const cbDestroyDatabase = (database: CouchBase): void => database.destroyDatabase()

export const cbCreateDocument = <T>(database: CouchBase, value: T, documentId: string): void => {
  const data = JSON.parse(JSON.stringify(value))
  database.createDocument(data, documentId)
}

export const cbGetDocument = <T>(database: CouchBase, documentId: string): T =>
  database.getDocument(documentId)

export const cbUpdateDocument = <T>(database: CouchBase, documentId: string, value: T): void => {
  database.updateDocument(documentId, value)
}

export const cbDeleteDocument = (database: CouchBase, documentId: string): void => {
  console.log(`couchbaseService.ts::cbDeleteDocument::documentId: ${JSON.stringify(documentId)}`)
  database.deleteDocument(documentId)
}

export const cbQueryDocuments = <T>(database: CouchBase, query: Query): Array<T> =>
  database.query(query)
