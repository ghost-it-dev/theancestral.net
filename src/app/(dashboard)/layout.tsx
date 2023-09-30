import Image from 'next/image';
import Navbar from '@/src/components/Navbar/Navbar';
import { getAllPostActivity } from '@/src/actions/activity';
import moment from 'moment';
import getActivityActionText from '@/src/lib/getActivityActionText';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const postActivity = await getAllPostActivity({ limit: 5 });

  return (
    <>
      <div className="relative flex min-h-[100vh] flex-col">
        <Navbar />
        {/* 3 column wrapper */}
        <div className="mx-auto w-full max-w-7xl flex-grow lg:flex xl:px-8">
          {/* Left sidebar & main wrapper */}
          <main className={'min-w-0 flex-1 bg-[#101826] xl:flex lg:border-l lg:border-[#1F2C37]'}>{children}</main>
          {/* Activity feed */}
          <aside className="bg-[#101826] lg:flex-shrink-0 lg:border-l lg:border-[#1F2C37] px-4 lg:px-8 xl:pr-0">
            <div className="lg:w-80">
              <div className="pt-6 pb-2">
                <h2 className="text-sm text-gray-200 font-semibold">Activity</h2>
              </div>
              <div>
                <ul role="list" className="divide-y divide-[#1F2C37] list-none">
                  {postActivity.map(activity => (
                    <li key={activity._id.toString()} className="py-4">
                      <div className="flex space-x-3">
                        <Image
                          height={24}
                          width={24}
                          className="rounded-full h-6 w-6"
                          src="https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4"
                          alt=""
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm text-gray-200 font-medium">{activity.username}</h3>
                            <p className="text-sm text-gray-300">{moment(activity.createdAt).fromNow()}</p>
                          </div>
                          <p className="text-sm text-gray-300">
                            {getActivityActionText(activity.action)} post <span className="text-indigo-400 font-bold cursor-pointer">{activity.postTitle}</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};
