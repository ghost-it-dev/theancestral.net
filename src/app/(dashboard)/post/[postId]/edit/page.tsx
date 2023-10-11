import { getPostById, getTags } from '@/src/actions/posts';
import { getUserFromSession } from '@/src/actions/user';
import ErrorMessage from '@/src/components/ErrorMessage';
import PostForm from '@/src/components/Forms/PostForm';
import { hasError } from '@/src/lib/response';
import { PostInterface } from '@/src/models/Post';
import { redirect } from 'next/navigation';

interface PageProps {
  params: { postId: PostInterface['_id'] };
}

async function Page({ params }: PageProps) {
  const user = await getUserFromSession();
  const post = await getPostById(params.postId);
  const tags = await getTags();

  if (hasError(post)) {
    return <ErrorMessage message={post.error} />;
  }

  if (!user || user?.role !== 'admin' || user?._id !== post.authorId) redirect('/');

  return (
    <div className='bg-[#101826] lg:min-w-0 lg:flex-1'>
      <PostForm tags={tags} isEditing={true} post={post} />
    </div>
  );
}

export default Page;
