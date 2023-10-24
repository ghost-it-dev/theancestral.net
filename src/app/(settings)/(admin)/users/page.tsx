import { getUserFromSession } from '@/src/actions/user';
import Section from '@/src/components/Section';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUserFromSession();

  if (!user || user.role !== 'admin') redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section title='Manage Users' description='Add, modify, or remove users.'>
          {/* Table here */}
        </Section>
      </div>
    </>
  );
}
