import { getUserFromSession } from '@/src/actions/user';
import Button from '@/src/components/Button';
import Section from '@/src/components/Section';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import UpdatePassword from './UpdatePassword';
import ViewEmail from './ViewEmail';

export default async function Page() {
  const reqUser = await getUserFromSession();
  if (!reqUser) redirect('/');

  return (
    <>
      <div className='space-y-6 px-0 lg:col-span-9'>
        <Section title='Account Details' description='View email and change password for your account.'>
          <div className='flex w-full items-center justify-between rounded-md border border-[#1F2C37] bg-transparent p-3 shadow-md'>
            <div className='flex flex-row gap-2'>
              <Image
                height={48}
                width={48}
                className='h-18 w-18 rounded-full'
                src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
                alt='avatar'
              />
              <div className='flex flex-col'>
                <span className='text-xl font-medium text-gray-100'>{reqUser.username}</span>
                <span className='text-xs capitalize text-gray-300'>{reqUser.role}</span>
              </div>
            </div>
            <Button disabled>Edit</Button>
          </div>
          <div className='mt-2 flex w-full flex-col gap-2 rounded-md border border-[#1F2C37] bg-transparent p-3 shadow-md '>
            <ViewEmail user={reqUser} />
            <UpdatePassword user={reqUser} />
          </div>
        </Section>
      </div>
    </>
  );
}
