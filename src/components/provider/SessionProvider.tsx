/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const AuthSessionProvider = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default AuthSessionProvider