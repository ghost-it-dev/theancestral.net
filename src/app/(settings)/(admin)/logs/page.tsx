import { getAllPostActivity } from '@/src/actions/activity';
import { getUserFromSession } from '@/src/actions/user';
import Section from '@/src/components/Section';
import getActivityActionText from '@/src/lib/getActivityActionText';
import moment from 'moment';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUserFromSession();
  const activity = await getAllPostActivity({ pageNumber: 1, pageSize: 10 });

  if (!user) redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section title='Account Details' description='View email and change password for your account.'>
          <table className='min-w-full divide-y divide-[#fff] rounded-md'>
            <thead className='bg-[#1E2936]'>
              <tr>
                <th scope='col' className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-200'>
                  Username
                </th>
                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'>
                  Action
                </th>
                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'>
                  Post
                </th>
                <th scope='col' className='px-3 py-3.5 text-left text-sm font-semibold text-gray-200'>
                  Date
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-[#1F2C37] bg-[#1E2936]'>
              {activity.map(item => (
                <tr key={item._id.toString()}>
                  <td className='w-auto max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-200'>{item.username}</td>
                  <td className='px-3 py-4 text-sm text-gray-200'>{getActivityActionText(item.action)}</td>
                  <td className='px-3 py-4 text-sm font-bold text-indigo-400'>
                    <Link href={`/post/${item.postId}`}>{item.postTitle}</Link>
                  </td>
                  <td className='px-3 py-4 text-sm text-gray-200'>{moment(item.createdAt).format('L')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>
    </>
  );
}
