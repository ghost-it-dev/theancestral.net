import { getUserFromSession } from '@/src/actions/user';
import Section from '@/src/components/Section';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUserFromSession();

  if (!user) redirect('/');

  return (
    <>
      <div className='space-y-6 lg:col-span-9 px-0'>
        <Section title='Manage Users' description='Add, modify, or remove users.'>
          {/* Table here */}
        </Section>
      </div>
    </>
  );
}
