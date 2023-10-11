import Button from '@/src/components/Button';
import removeMD from '@/src/lib/removeMD';
import moment from 'moment';
import Link from 'next/link';
import { SpinnerCircular } from 'spinners-react';
import { getPosts } from '@/src/actions/posts';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import Pagination from '@/src/components/Pagination';
import { getRequestRole } from '@/src/actions/user';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const reqRole = await getRequestRole();
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 20;
  const data = await getPosts(page, pageSize);
  const totalPages = Math.ceil(data.totalCount / pageSize);

  return (
    <div className='bg-[#101826] lg:min-w-0 lg:flex-1 h-full'>
      <div className='border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center justify-between'>
        <h1 className='flex-1 text-gray-200 text-2xl font-medium'>All Posts</h1>
        {!(reqRole === 'guest') && <Button href={'/create'}>Create Post</Button>}
      </div>
      {data.posts?.length !== 0 ? (
        <div className='divide-y divide-[#1F2C37] list-none'>
          {data.posts?.map((post, index) => (
            <Link key={index} href={`/post/${post._id}`}>
              <div className='group relative py-5 px-4 sm:py-6 hover:bg-[#1E2936] cursor-pointer transition-colors border-b border-[#1F2C37]'>
                <div className='flex items-end justify-between space-x-4'>
                  <div className='min-w-0 space-y-1'>
                    <div className='flex items-center space-x-3'>
                      <h2 className='text-lg font-medium text-gray-100'>{post.title}</h2>
                    </div>
                    <span className='group relative flex items-center'>
                      <p className='truncate text-sm font-medium text-gray-400'>{removeMD(post.description)}</p>
                    </span>
                  </div>
                  <div className='hidden flex-shrink-0 flex-col items-end space-y-2 sm:flex'>
                    <div className='flex flex-row gap-1'>
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300 group-hover:bg-[#101826] transition-colors'
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className='flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300 group-hover:bg-[#101826] transition-colors'>
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>
                    <span className='flex items-center space-x-2 text-sm text-gray-400'>
                      <p>{post.authorName}</p>
                      <div className='w-1 h-1 rounded-full bg-gray-400' />
                      <p>Last updated {moment(post.updatedAt).fromNow()}</p>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className='w-full flex items-center flex-col p-4 lg:p-12 gap-2'>
          {data.totalCount === 0 ? (
            <>
              <DocumentTextIcon className='h-16 w-16 text-gray-400' />
              <p className='text-gray-300 text-lg'>No posts found.</p>
            </>
          ) : (
            <SpinnerCircular size={75} thickness={150} secondaryColor='rgba(0, 0, 0, .2)' color='#fff' />
          )}
        </div>
      )}
      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}
    </div>
  );
}
