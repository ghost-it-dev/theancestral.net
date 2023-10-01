import { getAllPostActivity } from '@/src/actions/activity';
import { getUserFromSession } from '@/src/actions/user';
import Section from '@/src/components/Section';
import classNames from 'classnames';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const user = await getUserFromSession();
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const postActivity = await getAllPostActivity({ pageNumber: page, pageSize: 5 });
  console.log(page)

  if (!user) redirect('/');

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <Section title="View Logs" description="Access logs and track activity across all posts">
          {postActivity.map(activity => (
            <div className='text-white'>
              {activity._id.toString()}
            </div>
          ))}
        </Section>
        <Link
          href={{
            pathname: '/logs',
            query: {
              page: page > 1 ? page - 1 : 1
            }
          }}
          className={classNames(
            'rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800',
            page <= 1 && 'pointer-events-none opacity-50'
          )}
        >
          Previous
        </Link>
        <Link
          href={{
            pathname: '/logs',
            query: {
              page: page + 1
            }
          }}
          className='rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800'
        >
          Next
        </Link>
      </div>
    </>
  );
}
