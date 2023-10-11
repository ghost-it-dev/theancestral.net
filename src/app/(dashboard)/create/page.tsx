import { getTags } from '@/src/actions/posts';
import { getUserFromSession } from '@/src/actions/user';
import PostForm from '@/src/components/Forms/PostForm';
import { redirect } from 'next/navigation';

async function Page() {
  const tags = await getTags();
  const user = await getUserFromSession();

  if (!user || user?.role !== 'admin') redirect('/');

  return (
    <div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
      <PostForm tags={tags} isEditing={false} />
    </div>
  );
}

export default Page;
