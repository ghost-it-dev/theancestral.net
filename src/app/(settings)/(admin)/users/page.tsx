import { getAllUsers, getUserFromSession } from '@/src/actions/user';
import Pagination from '@/src/components/Pagination';
import Section from '@/src/components/Section';
import moment from 'moment';
import { redirect } from 'next/navigation';
import { DocumentTextIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { SpinnerCircular } from 'spinners-react';
import { hasError } from '@/src/lib/response';
import UserActions from './UserActions';
import Button from '@/src/components/Button';
import CreateUserButton from './CreateUserButton';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const reqUser = await getUserFromSession();
  const pageNumber = searchParams.page ? parseInt(searchParams.page) : 1;
  const pageSize = 10;
  const data = await getAllUsers({ pageNumber, pageSize });

  if (hasError(data)) {
    return (
      <div className='flex w-full flex-col items-center gap-2 p-4 lg:p-12 lg:col-span-9'>
        <ExclamationTriangleIcon className='h-16 w-16 text-gray-400' />
        <p className='text-lg text-gray-300'>Error getting users.</p>
      </div>
    )
  }

  const totalPages = Math.ceil(data.totalCount / pageSize);
  if (!reqUser || reqUser.role !== 'admin') redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section
          header={
            <div className='flex flex-row justify-between items-center'>
              <div>
                <h2 className='text-lg font-medium leading-6 text-gray-100'>Manage Users</h2>
                <p className='mt-0.5 text-sm text-gray-200'>Add, modify, or remove users.</p>
              </div>
              <CreateUserButton />
            </div>
          }>
          {data.users?.length !== 0 ? (
            <div className="overflow-hidden overflow-x-auto ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-[#1E2936]">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200 sm:pl-6">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200 hidden sm:table-cell">
                      Username
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Role
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      Created
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-200">
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900 bg-[#1E2936]">
                  {data.users?.map(item => (
                    <tr key={item._id.toString()}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200 sm:pl-6">
                        {item.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200 hidden sm:table-cell">{item.username}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200 capitalize">
                        {item.role}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                        {moment(item.createdAt).format('L')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200 sm:pr-6">
                        <UserActions user={item} reqUser={reqUser} />
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
                  <p className='text-lg text-gray-300'>No users found.</p>
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

