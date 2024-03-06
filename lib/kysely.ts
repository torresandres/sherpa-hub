import { Generated, ColumnType } from 'kysely'
import { createKysely } from '@vercel/postgres-kysely'

interface UserTable {
  id: string,
  username: string,
  locale: string,
  region: 'NA' | 'SA' | 'EU' | 'AF' | 'AS' | 'OCE',
  status: 'regular' | 'limited' | 'banned',
  role: 'user' | 'sherpa' | 'sherpa-instructor' | 'sherpa-coordinator' | 'emissary' | 'bsg',
  created_at: ColumnType<Date, string, never>
  updated_at: ColumnType<Date, string>
}
interface SessionTable {
  id: Generated<number>,
  user_id: string,
  sherpa_id: string | null,
  status: 'open' | 'accepted' | 'in-progress' | 'closed',
  created_at: ColumnType<Date, string, never>
  updated_at: ColumnType<Date, string>
}

export interface Database {
  users: UserTable,
  sessions: SessionTable,
}

export const db = createKysely<Database>()
export { sql } from 'kysely'
