import Image from 'next/image';
import Navbar from '@/src/components/Navbar/Navbar';
import { getAllPostActivity } from '@/src/actions/activity';
import moment from 'moment';
import getActivityActionText from '@/src/lib/getActivityActionText';
import classNames from 'classnames';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await getAllPostActivity({ pageNumber: 1, pageSize: 5 });

  return (
    <>
      <div className='relative flex min-h-[100vh] flex-col'>
        <Navbar />
        {/* 3 column wrapper */}
        <div className='mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8'>
          {/* Left sidebar & main wrapper */}

          <main
            className={classNames(
              data.totalCount !== 0
                ? 'min-w-0 flex-1 bg-[#101826] lg:border-l lg:border-[#1F2C37] xl:flex'
                : 'min-w-0 flex-1 bg-[#101826] lg:border-x lg:border-[#1F2C37] xl:flex',
            )}
          >
            {children}
          </main>
          {/* Activity feed */}
          {data.totalCount !== 0 && (
            <aside className='bg-[#101826] px-4 lg:flex-shrink-0 lg:border-l lg:border-[#1F2C37] lg:px-8 xl:pr-0'>
              <div className='lg:w-80'>
                <div className='pb-2 pt-6'>
                  <h2 className='select-none text-sm font-semibold text-gray-200'>Activity</h2>
                </div>
                <div>
                  <ul role='list' className='select-none list-none divide-y divide-[#1F2C37]'>
                    {data.activity?.map(item => (
                      <li key={item._id.toString()} className='py-4'>
                        <div className='flex space-x-3'>
                          <Image
                            height={24}
                            width={24}
                            className='h-6 w-6 rounded-full'
                            src='https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4'
                            alt=''
                          />
                          <div className='flex-1 space-y-1'>
                            <div className='flex items-center justify-between'>
                              <h3 className='text-sm font-medium text-gray-200'>{item.username}</h3>
                              <p className='text-sm text-gray-300'>{moment(item.createdAt).fromNow()}</p>
                            </div>
                            <p className='text-sm text-gray-300'>
                              {getActivityActionText(item.action)} post{' '}
                              <span className='font-bold text-indigo-400'>{item.postTitle}</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
}
