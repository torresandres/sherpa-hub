import { useCallback } from 'react'
import { signIn, signOut } from 'next-auth/react'
export default function Header() {
  const logout = useCallback(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  const login = useCallback(() => {
    signIn('discord', { callbackUrl: '/guilds' })
  }, [])

  return (
    <header>
      <button onClick={signIn}></button>
    </header>
  )
}