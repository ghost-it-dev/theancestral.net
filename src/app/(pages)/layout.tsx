import classNames from 'classnames'
import './globals.css'
import Button from '../../components/Button'
import { CheckBadgeIcon, RectangleStackIcon } from '@heroicons/react/24/outline'
import Navbar from '../../components/Navbar'
import Image from 'next/image'
import { getUserFromSession } from '../actions/user'

export const metadata = {
  title: 'Ancestral'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromSession()

  return (
    <html lang="en">
      <body className={'bg-[#101826]'}>
        <div className='relative flex min-h-[100vh] flex-col'>
          <Navbar />
          {/* 3 column wrapper */}
          <div className='mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8'>
            {/* Left sidebar & main wrapper */}
            <div className={classNames(user ? 'min-w-0 flex-1 bg-[#101826] xl:flex' : 'min-w-0 flex-1 bg-[#101826] xl:flex lg:border-l lg:border-[#1F2C37]')}>
              {user && (
                <div className='bg-[#101826] xl:w-64 xl:flex-shrink-0 xl:border-r xl:border-[#1F2C37]'>
                  <div className='py-6 px-4 sm:px-8 xl:pl-0'>
                    <div className='flex items-center justify-between'>
                      <div className='flex-1 space-y-4'>
                        <div className='space-y-4 sm:flex sm:items-center sm:justify-between sm:space-y-0 xl:block xl:space-y-4'>
                          <div className='flex items-center space-x-3'>
                            <div className='h-12 w-12 flex-shrink-0'>
                              <Image
                                height={48}
                                width={48}
                                className='rounded-full'
                                src='https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4'
                                alt=''
                              />
                            </div>
                            <div>
                              <div className='text-sm font-medium text-gray-200'>{user.username}</div>
                              <span className='group flex items-center space-x-1.5 text-sm font-medium text-gray-300'>{user.name}</span>
                            </div>
                          </div>
                          <div className='flex flex-col sm:flex-row xl:flex-col'>
                            <Button href={'/post/create'} className='xl:w-full'>
                              New Post
                            </Button>
                          </div>
                        </div>
                        <div className='flex flex-row space-y-0 space-x-2 xl:flex-col xl:space-x-0 xl:space-y-2'>
                          <div className='flex items-center space-x-2'>
                            <CheckBadgeIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                            <span className='text-sm font-medium text-gray-200'>{user.role === 'admin' ? 'Admin' : 'User'}</span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <RectangleStackIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
                            <span className='text-sm font-medium text-gray-200'>{user.postAmount} Posts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {children}
            </div>
            {/* Activity feed */}
            <div className='bg-[#101826] lg:flex-shrink-0 lg:border-l lg:border-[#1F2C37] px-4 lg:px-8 xl:pr-0'>
              <div className='lg:w-80'>
                <div className='pt-6 pb-2'>
                  <h2 className='text-sm text-gray-200 font-semibold'>Activity</h2>
                </div>
                <div>
                  <ul role='list' className='divide-y divide-[#1F2C37] list-none'>
                    <li className='py-4'>
                      <div className='flex space-x-3'>
                        <Image
                          height={0}
                          width={0}
                          className='rounded-full h-6 w-6'
                          src='https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4'
                          alt=''
                        />
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm text-gray-200 font-medium'>You</h3>
                            <p className='text-sm text-gray-300'>1h</p>
                          </div>
                          <p className='text-sm text-gray-300'>Created post <span className='text-indigo-400 font-bold cursor-pointer'>cool post name</span></p>
                        </div>
                      </div>
                    </li>
                    <li className='py-4'>
                      <div className='flex space-x-3'>
                        <Image
                          height={0}
                          width={0}
                          className='rounded-full h-6 w-6'
                          src='https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4'
                          alt=''
                        />
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm text-gray-200 font-medium'>You</h3>
                            <p className='text-sm text-gray-300'>1h</p>
                          </div>
                          <p className='text-sm text-gray-300'>Created post <span className='text-indigo-400 font-bold cursor-pointer'>cool post name</span></p>
                        </div>
                      </div>
                    </li>
                    <li className='py-4'>
                      <div className='flex space-x-3'>
                        <Image
                          height={0}
                          width={0}
                          className='rounded-full h-6 w-6'
                          src='https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4'
                          alt=''
                        />
                        <div className='flex-1 space-y-1'>
                          <div className='flex items-center justify-between'>
                            <h3 className='text-sm text-gray-200 font-medium'>You</h3>
                            <p className='text-sm text-gray-300'>1h</p>
                          </div>
                          <p className='text-sm text-gray-300'>Created post <span className='text-indigo-400 font-bold cursor-pointer'>cool post name</span></p>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className='py-4 text-sm text-right'>
                    <a href='#' className='font-semibold text-gray-200'>
                      View all activity
                      <span aria-hidden='true'> &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
