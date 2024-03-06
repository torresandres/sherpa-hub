import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string,
    locale: string,
    region: string,
    status: string,
    role: string,
    created_at?: date,
    updated_at: date,
  }
}