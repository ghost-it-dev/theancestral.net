import { getAllPostActivity } from '@/src/actions/activity';
import { getUserFromSession } from '@/src/actions/user';
import { redirect } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUserFromSession();
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const postActivity = await getAllPostActivity({ pageNumber: page, pageSize: 5 });

  if (!user) redirect('/');

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <table>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </table>
      </div>
    </>
  );
}
