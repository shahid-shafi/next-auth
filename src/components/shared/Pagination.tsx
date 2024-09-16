'use client';
import cn from '@/lib/common';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [currPage, setCurrPage] = useState<number>(1);
  const searchParams = new URLSearchParams(params.toString());

  useEffect(() => {
    const pageParam = params.get('page');
    setCurrPage(pageParam ? Number(pageParam) : 1);
  }, [params]);

  const onPaginationChange = (page: number) => {
    searchParams.set('page', String(page));
    router.replace(`${pathname}?${searchParams.toString()}`);
  };

  const handleNextPage = () => {
    if (currPage < totalPages) {
      searchParams.set('page', String(currPage + 1));
      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };

  const handlePreviousPage = () => {
    if (currPage > 1) {
      searchParams.set('page', String(currPage - 1));
      router.replace(`${pathname}?${searchParams.toString()}`);
    }
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <div
              onClick={handlePreviousPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>

            <>
              {[...Array(totalPages)].map((x: any, index: number) => (
                <PaginationItem
                  currPage={currPage}
                  onPaginationChange={onPaginationChange}
                  key={x}
                  page={index + 1}
                />
              ))}
            </>
            <div
              onClick={handleNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

const PaginationItem = ({
  page,
  currPage,
  onPaginationChange,
}: {
  page: number;
  currPage: number;
  onPaginationChange: (page: number) => void;
}) => {
  return (
    <span
      onClick={() => onPaginationChange(page)}
      aria-current="page"
      className={cn(
        'cursor-pointer border-y-2 relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-black focus:z-20',
        `  ${currPage === page ? 'text-white bg-indigo-600' : ''}`
      )}
    >
      {page}
    </span>
  );
};
