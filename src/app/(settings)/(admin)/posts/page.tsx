import { getUserFromSession } from '@/src/actions/user';
import Section from '@/src/components/Section';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUserFromSession();

  if (!user) redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section title='Manage Posts' description='Oversee posts across all users, with capabilities to delete and modify posts.'
        >
          {/* Table here */}
        </Section>
      </div>
    </>
  );
}
