import { getPostById } from '@/src/app/actions/posts';
import { getUserFromSession } from '@/src/app/actions/user';
import ErrorMessage from '@/src/components/ErrorMessage';
import PostCreate from '@/src/components/Forms/PostForm';
import { hasError } from '@/src/lib/hasError';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { postId: string };
}

async function Page({ params }: PageProps) {
  const user = await getUserFromSession();
  const post = await getPostById(params.postId);

  // redirect to error page
  if (hasError(post)) {
    return <ErrorMessage message={post.error} />;
  }

  if (user?.role !== 'admin' || user?._id !== post.authorId) {
    redirect('/');
  }

  return (
    <div className="bg-[#101826] lg:min-w-0 lg:flex-1">
      <PostCreate isEditing={true} post={post} />
    </div>
  );
}

export default Page;
