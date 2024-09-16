/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'

const PostingListing = ({ posts }: any) => {
  console.log(posts)
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
      <Link href="/posts/[id]">
        <a>View Post</a>
      </Link>
      <Link href="/posts/new">
        <a>Create New Post</a>
      </Link>
    </div>
  )
}

export default PostingListing