import { getUserFromSession } from '@/src/actions/user';
import Pagination from '@/src/components/Pagination';
import Section from '@/src/components/Section';
import moment from 'moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { SpinnerCircular } from 'spinners-react';
import { getPosts } from '@/src/actions/post';
import PostActions from './PostActions';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const reqUser = await getUserFromSession();
  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 10;
  const data = await getPosts({ pageNumber, pageSize });
  const totalPages = Math.ceil(data.totalCount / pageSize);

  if (!reqUser || reqUser.role !== 'admin') redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section
          header={
            <div>
              <h2 className='text-lg font-medium leading-6 text-gray-100'>Manage Posts</h2>
              <p className='mt-0.5 text-sm text-gray-200'>Oversee posts across all users, with capabilities to delete and modify posts.</p>
            </div>
          }>
          {data.posts?.length !== 0 ? (
            <div className="overflow-hidden overflow-x-auto ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-[#1E2936]">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Author
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Created
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Updated
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-[#1E2936]">
                  {data.posts?.map(item => (
                    <tr key={item._id.toString()}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-indigo-400 font-bold sm:pl-6">
                        <Link href={`/post/${item._id}`}>{item.title}</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{item.authorName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                        {moment(item.createdAt).format('L')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                        {moment(item.updatedAt).format('L')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200 sm:pr-6">
                        <PostActions post={item} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='flex w-full flex-col items-center gap-2 p-4 lg:p-12'>
              {data.totalCount === 0 ? (
                <>
                  <DocumentTextIcon className='h-16 w-16 text-gray-400' />
                  <p className='text-lg text-gray-300'>No posts found.</p>
                </>
              ) : (
                <SpinnerCircular size={75} thickness={150} secondaryColor='rgba(0, 0, 0, .2)' color='#fff' />
              )}
            </div>
          )}
          {totalPages > 1 && <Pagination currentPage={pageNumber} totalPages={totalPages} />}
        </Section>
      </div>
    </>
  );
}

