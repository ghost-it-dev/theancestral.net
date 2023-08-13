import removeMD from '@/src/lib/removeMD';
import { getPosts } from '../actions/posts';
import { SpinnerCircular } from 'spinners-react';
import moment from 'moment';
import DashboardLayout from './(dashboard)/layout';
import Button from '@/src/components/Button';
import { DocumentIcon } from '@heroicons/react/24/outline';

export default async function Page() {
  const data = await getPosts(1, 5);

  // Use dashboard layout here because we can't move this file to src\app\(pages)\(dashboard)\feed.tsx
  return (
    <>
      <DashboardLayout>
        <div className="bg-[#101826] lg:min-w-0 lg:flex-1 h-full">
          <div className="border-b border-t border-[#1F2C37] py-4 pb-4 px-4 xl:border-t-0 xl:pt-6 h-[105px] flex items-center justify-between">
            <h1 className="flex-1 text-gray-200 text-2xl font-medium">All Posts</h1>
            <Button href={'/create'}>Create Post</Button>
          </div>
          {data.posts?.length !== 0 ? (
            <div className="divide-y divide-[#1F2C37] list-none">
              {data.posts?.map(post => (
                <a key={post._id} href={`/post/${post._id}`}>
                  <div className="group relative py-5 px-4 sm:py-6 hover:bg-[#1E2936] cursor-pointer transition-colors border-b border-[#1F2C37]">
                    <div className="flex items-end justify-between space-x-4">
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center space-x-3">
                          <h2 className="text-lg font-medium text-gray-100">{post.title}</h2>
                        </div>
                        <span className="group relative flex items-center">
                          <p className="truncate text-sm font-medium text-gray-400">{removeMD(post.description)}</p>
                        </span>
                      </div>
                      <div className="hidden flex-shrink-0 flex-col items-end space-y-2 sm:flex">
                        <div className="flex flex-row gap-1">
                          {['Windows', 'Linux', 'MacOS'].map(os => (
                            <span
                              key={os}
                              className="flex items-center px-1.5 py-0.5 rounded-[4px] text-xs font-bold bg-[#1E2936] text-gray-300 group-hover:bg-[#101826] transition-colors"
                            >
                              {os}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center space-x-2 text-sm text-gray-400">
                          <p>{post.authorName}</p>
                          <div className="w-1 h-1 rounded-full bg-gray-400" />
                          <p>Last updated {moment(post.updatedAt).fromNow()}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <>
              {data.totalCount === 0 ? (
                <div className="w-full h-full flex items-center flex-col  p-4 lg:p-12">
                  <DocumentIcon className="h-16 w-16 text-gray-400" />
                  <p className="text-gray-300 text-lg">No posts found.</p>
                </div>
              ) : (
                <SpinnerCircular size={75} thickness={150} secondaryColor="rgba(0, 0, 0, .2)" color="#fff" />
              )}
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
