import { getUserFromSession } from '@/src/actions/user';
import Navbar from '@/src/components/Navbar/Navbar';
import { DocumentMagnifyingGlassIcon, DocumentTextIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const reqUser = await getUserFromSession();

  return (
    <>
      <div className='relative flex min-h-[100vh] flex-col'>
        <Navbar />
        <main className='mx-auto flex w-full max-w-7xl flex-grow px-4 py-6 xl:px-8'>
          <div className='w-full lg:grid lg:grid-cols-12 lg:gap-x-5'>
            <aside className='lg:col-span-3'>
              <nav className='space-y-2'>
                <div className='space-y-1 border-b-2 border-[#1E2936] pb-2'>
                  {reqUser?.role === 'admin' && (
                    <>
                      <Link
                        href={'/users'}
                        className={
                          'group flex items-center rounded-md bg-[#1E2936] px-3 py-2 text-sm font-medium text-gray-100 hover:text-gray-300'
                        }
                      >
                        <UsersIcon
                          className={'mr-2 h-6 w-6 flex-shrink-0 text-gray-100 group-hover:text-gray-300'}
                          aria-hidden='true'
                        />
                        <span className='truncate'>Manage Users</span>
                      </Link>
                      <Link
                        href={'/posts'}
                        className={
                          'group flex items-center rounded-md bg-[#1E2936] px-3 py-2 text-sm font-medium text-gray-100 hover:text-gray-300'
                        }
                      >
                        <DocumentTextIcon
                          className={'mr-2 h-6 w-6 flex-shrink-0 text-gray-100 group-hover:text-gray-300'}
                          aria-hidden='true'
                        />
                        <span className='truncate'>Manage Posts</span>
                      </Link>
                      <Link
                        href={'/activity'}
                        className={
                          'group flex items-center rounded-md bg-[#1E2936] px-3 py-2 text-sm font-medium text-gray-100 hover:text-gray-300'
                        }
                      >
                        <DocumentMagnifyingGlassIcon
                          className={'mr-2 h-6 w-6 flex-shrink-0 text-gray-100 group-hover:text-gray-300'}
                          aria-hidden='true'
                        />
                        <span className='truncate'>Activity</span>
                      </Link>
                    </>
                  )}
                </div>

                <div className='space-y-1'>
                  <Link
                    href={'/settings'}
                    className={
                      'group flex items-center rounded-md bg-[#1E2936] px-3 py-2 text-sm font-medium text-gray-100 hover:text-gray-300'
                    }
                  >
                    <UserCircleIcon
                      className={'mr-2 h-6 w-6 flex-shrink-0 text-gray-100 group-hover:text-gray-300'}
                      aria-hidden='true'
                    />
                    <span className='truncate'>Account Settings</span>
                  </Link>
                </div>
              </nav>
            </aside>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
