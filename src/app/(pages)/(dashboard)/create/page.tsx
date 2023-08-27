import { getTags } from '@/src/app/actions/posts';
import { getRequestRole } from '@/src/app/actions/user';
import PostForm from '@/src/app/components/Forms/PostForm';
import { redirect } from 'next/navigation';

async function Page() {
  const tags = await getTags();
  const reqRole = await getRequestRole();
  if (reqRole === 'guest') return redirect('/');

  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <PostForm tags={tags} isEditing={false} />
    </div>
  );
}

export default Page;
