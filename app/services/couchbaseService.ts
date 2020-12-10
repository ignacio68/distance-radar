import { CouchBase, Query } from '@triniwiz/nativescript-couchbase'

export const setDatabase = (name: string): CouchBase => new CouchBase(name)

export const closeDatabase = (database: CouchBase): void => database.close()

export const destroyDatabase = (database: CouchBase): void => database.destroyDatabase()

export const addDocument = <T>(database: CouchBase, value: T, documentId: string): void =>
  database.createDocument(value, documentId)

export const getDocument = <T>(database: CouchBase, documentId: string): T =>
  database.getDocument(documentId)

export const updateDocument = <T>(database: CouchBase, documentId: string, value: T): void =>
  database.updateDocument(documentId, value)

export const deleteDocument = (database: CouchBase, documentId: string): void =>
  database.deleteDocument(documentId)

export const queryDocuments = <T>(database: CouchBase, query: Query): Array<T> =>
  database.query(query)
