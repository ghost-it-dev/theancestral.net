import { getPostById, getTags } from '@/src/app/actions/posts';
import { getRequestRole, getUserFromSession } from '@/src/app/actions/user';
import ErrorMessage from '@/src/app/components/ErrorMessage';
import PostForm from '@/src/app/components/Forms/PostForm';
import { hasError } from '@/src/lib/hasError';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { postId: string };
}

async function Page({ params }: PageProps) {
  const user = await getUserFromSession();
  const post = await getPostById(params.postId);
  const tags = await getTags();
  const reqRole = await getRequestRole();

  // redirect to error page
  if (hasError(post)) {
    return <ErrorMessage message={post.error} />;
  }

  if (reqRole === 'guest') return redirect('/');
  if (user?.role !== 'admin' || user?._id !== post.authorId) return redirect('/');

  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <PostForm tags={tags} isEditing={true} post={post} />
    </div>
  );
}

export default Page;
