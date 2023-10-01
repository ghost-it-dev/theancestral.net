import { getUserFromSession } from '@/src/actions/user';
import Navbar from '@/src/components/Navbar/Navbar';
import { AdjustmentsHorizontalIcon, CogIcon, DocumentMagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromSession();

  return (
    <>
      <div className="relative flex min-h-[100vh] flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-grow flex px-4 xl:px-8 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5 w-full">
            <aside className="lg:col-span-3">
              <nav className="space-y-1">
                {user?.role === 'admin' && (
                  <>
                    <Link
                      href={'/admin'}
                      className={
                        'group rounded-md px-3 py-2 flex items-center text-sm font-medium bg-[#1E2936] text-gray-100 hover:text-gray-300'
                      }
                    >
                      <AdjustmentsHorizontalIcon
                        className={'flex-shrink-0 mr-2 h-6 w-6 text-gray-100 group-hover:text-gray-300'}
                        aria-hidden="true"
                      />
                      <span className="truncate">Admin Settings</span>
                    </Link>
                    <Link
                      href={'/logs'}
                      className={
                        'group rounded-md px-3 py-2 flex items-center text-sm font-medium bg-[#1E2936] text-gray-100 hover:text-gray-300'
                      }
                    >
                      <DocumentMagnifyingGlassIcon
                        className={'flex-shrink-0 mr-2 h-6 w-6 text-gray-100 group-hover:text-gray-300'}
                        aria-hidden="true"
                      />
                      <span className="truncate">Logs</span>
                    </Link>
                  </>
                )}
                <Link
                  href={'/settings'}
                  className={
                    'group rounded-md px-3 py-2 flex items-center text-sm font-medium bg-[#1E2936] text-gray-100 hover:text-gray-300'
                  }
                >
                  <UserCircleIcon
                    className={'flex-shrink-0 mr-2 h-6 w-6 text-gray-100 group-hover:text-gray-300'}
                    aria-hidden="true"
                  />
                  <span className="truncate">Account Settings</span>
                </Link>
              </nav>
            </aside>
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
