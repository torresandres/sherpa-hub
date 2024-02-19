'use client'

import { useCallback } from 'react'
import { signIn, signOut } from 'next-auth/react'

import classes from './Header.module.css'

export default function Header() {
  const login = useCallback(() => {
    signIn('discord', { callbackUrl: '/' })
  }, [])

  const logout = useCallback(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <header>
      <h1 className={classes.title}>Sherpa Hub</h1>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </header>
  )
}