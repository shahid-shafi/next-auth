"use client"
import Link from 'next/link'
import React from 'react'
import SignOutButton from './SignOutButton'
import { useSession } from 'next-auth/react'

const Navbar = () => {
  const session = useSession();
  return (
    <div className="flex justify-between px-10 py-4 bg-blue-400">
      <Link href="/posts" className="text-blue-500">Check Posts</Link>
      <br />
      {session.status !== "authenticated" && <>
        <Link href="/auth/login" className="text-blue-500">Login</Link>
        <br />
        <Link href="/auth/signup" className="text-blue-500">SignUp/Register</Link>
      </>}
      <SignOutButton />
    </div>
  )
}

export default Navbar