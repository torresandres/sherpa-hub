'use client'

import { useCallback } from 'react'
import { signIn, signOut } from 'next-auth/react'

import classes from './LoginForm.module.css'

export default function LoginForm() {

  const login = useCallback(() => {
    signIn('discord', { callbackUrl: '/' })
  }, [])

  const logout = useCallback(() => {
    signOut({ callbackUrl: '/' })
  }, [])

  return (
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}