"use client"
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignOutButton = () => {
  const router = useRouter()
  const handleSignOut = () => {
    signOut();
    router.replace("/auth/login")
  }
  return (
    <button onClick={handleSignOut}>LogOut</button>
  )
}

export default SignOutButton