import type { Accountability, Item, PrimaryKey, Query } from '@directus/types'

export interface AbstractService<T = Item> {
  accountability: Accountability | null | undefined

  createOne(data: Partial<T>): Promise<PrimaryKey>
  createMany(data: Partial<T>[]): Promise<PrimaryKey[]>

  readOne(key: PrimaryKey, query?: Query): Promise<T>
  readMany(keys: PrimaryKey[], query?: Query): Promise<T[]>
  readByQuery(query: Query): Promise<T[]>

  updateOne(key: PrimaryKey, data: Partial<T>): Promise<PrimaryKey>
  updateMany(keys: PrimaryKey[], data: Partial<T>): Promise<PrimaryKey[]>

  deleteOne(key: PrimaryKey): Promise<PrimaryKey>
  deleteMany(keys: PrimaryKey[]): Promise<PrimaryKey[]>
}
