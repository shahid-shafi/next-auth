/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/lib/prisma'
import dayjs from 'dayjs'
import React from 'react'

export default async function PostPage({ params }: any) {
  const post = await prisma.post.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className='p-20'>
      <ul className='p-4 rounded-xl bg-slate-300 shadow-sm shadow-black' >
        <li className='text-lg font-semibold'>{post?.title}</li>
        <li className='text-black/70'>{post?.content}</li>
        <div className='flex justify-between'>
          <p>Author: {post?.author?.name}</p>
          <p>Date: {dayjs(post?.createdAt)?.format("dddd DD-MM-YYYY")}</p>
        </div>
      </ul>
    </div>
  )
}
