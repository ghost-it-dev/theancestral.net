import { getUserFromSession } from '@/src/actions/user';
import Button from '@/src/components/Button';
import Section from '@/src/components/Section';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import UpdatePassword from './UpdatePassword';
import ViewEmail from './ViewEmail';

export default async function Page() {
  const user = await getUserFromSession();
  if (!user) redirect('/');

  return (
    <>
      <div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <Section title="Account Details" description="asdasd">
          <div className="w-full p-3 flex justify-between items-center rounded-md bg-transparent border border-[#1F2C37] shadow-md">
            <div className="flex flex-row gap-2">
              <Image
                height={48}
                width={48}
                className="rounded-full h-18 w-18"
                src={
                  'https://avatars.githubusercontent.com/u/38229170?s=400&u=b6d25af34d7cd519ee3f69a701229dfe35ace5da&v=4'
                }
                alt=""
              />
              <div className="flex flex-col">
                <span className="text-xl text-gray-100 font-medium">{user.username}</span>
                <span className="text-xs text-gray-300 capitalize">{user.role}</span>
              </div>
            </div>
            <Button>Edit</Button>
          </div>
          <div className="w-full p-3 flex flex-col gap-2 rounded-md bg-transparent border border-[#1F2C37] shadow-md mt-2 ">
            <ViewEmail user={user} />
            <UpdatePassword user={user} />
          </div>
        </Section>
      </div>
    </>
  );
}
