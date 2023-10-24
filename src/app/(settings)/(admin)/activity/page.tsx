import { getAllPostActivity } from '@/src/actions/activity';
import { getUserFromSession } from '@/src/actions/user';
import Pagination from '@/src/components/Pagination';
import Section from '@/src/components/Section';
import moment from 'moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import { SpinnerCircular } from 'spinners-react';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const user = await getUserFromSession();
  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 10;
  const data = await getAllPostActivity({ pageNumber, pageSize });
  const totalPages = Math.ceil(data.totalCount / pageSize);

  if (!user || user.role !== 'admin') redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section title='Activity' description='View all post activity.'>
          {data.activity?.length !== 0 ? (
            <div className="overflow-hidden overflow-x-auto ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-900 table-fixed">
                <thead className="bg-[#1E2936]">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                      Username
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Action
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Post
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-[#1E2936]">
                  {data.activity?.map(item => (
                    <tr key={item._id.toString()}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-200 sm:pl-6">
                        {item.username}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200 capitalize">{item.action}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-bold text-indigo-400 cursor-pointer">
                        <Link href={`/post/${item.postId}`}>{item.postTitle}</Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">{moment(item.createdAt).format('L')}</td>
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
                  <p className='text-lg text-gray-300'>No activity found.</p>
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
