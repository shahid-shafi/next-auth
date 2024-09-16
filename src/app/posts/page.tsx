"use server"
import Pagination from '@/components/shared/Pagination';
import prisma from '@/lib/prisma';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react'

export default async function PostsListingPage({ searchParams }: { searchParams: { page: number } }) {
  const page = searchParams.page
  const limit = 1;
  const skip = (page - 1) * limit;

  const [posts, count] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.post.count(),
  ]);
  const totalPages = Math.ceil(count / limit);

  return (
    <div className='p-10'>
      <h1>Posts({`${count}`})</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts?.map(post => <Link key={post?.slug} href={`posts/${post?.slug}`}>
          <ul className='p-4 rounded-xl bg-slate-300 shadow-sm shadow-black' >
            <li className='text-lg font-semibold'>{post?.title}</li>
            <li className='text-black/70'>{post?.content}</li>
            <div className='flex justify-between'>
              <p>Author: {post?.author?.name}</p>
              <p>Date: {dayjs(post?.createdAt)?.format("dddd DD-MM-YYYY")}</p>
            </div>
          </ul>
        </Link>
        )}
      </div>
      <div>
        <Pagination totalPages={totalPages} />
      </div>
    </div>

  )
}

