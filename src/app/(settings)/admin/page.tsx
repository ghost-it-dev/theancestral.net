import { getUserFromSession } from '@/src/actions/user';
import Section from '@/src/components/Section';
import { redirect } from 'next/navigation';

export default async function Page() {
  const user = await getUserFromSession();
  // const pfp = await getProfilePicture();

  if (!user) redirect('/');

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <Section
          title="Manage Posts"
          description="Oversee posts across all users, with capabilities to delete and modify posts."
        >
          {/* Table here */}
        </Section>
        <Section title="Manage Users" description="Add, modify, or remove users.">
          {/* Table here */}
        </Section>
      </div>
    </>
  );
}
